import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signAccessToken } from "@/lib/auth/jwt";
import { generateRefreshToken } from "@/lib/auth/tokens";
import { getClientIP, getDeviceInfo, getUserAgent } from "@/lib/auth/device";
import { logAction } from "@/lib/auth/audit";
import { getLocationFromIP } from "@/lib/auth/getLocation";
import { findSystemAccount } from "@/lib/auth/systemUsers";

export async function POST(req: Request) {
    try {
        const { email, password, rememberMe } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const systemAcc = findSystemAccount(normalizedEmail);

        let authenticatedUserId: string | null = null;
        let authenticatedRole: any = "USER";
        let authenticatedFirstName = "User";
        let authenticatedLastName = "";

        // 1. Check System Accounts first
        if (systemAcc) {
            if (password !== systemAcc.password) {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }

            authenticatedUserId = systemAcc.id;
            authenticatedRole = systemAcc.role;
            authenticatedFirstName = systemAcc.firstName;
            authenticatedLastName = systemAcc.lastName;

            // Attempt to ensure user exists in Database if database is online
            try {
                let dbUser = await prisma.user.findUnique({ where: { email: systemAcc.email } });
                if (!dbUser) {
                    const hashedPassword = await bcrypt.hash(systemAcc.password, 10);
                    dbUser = await prisma.user.create({
                        data: {
                            id: systemAcc.id,
                            email: systemAcc.email,
                            password: hashedPassword,
                            role: systemAcc.role as any,
                            firstName: systemAcc.firstName,
                            lastName: systemAcc.lastName,
                            acceptedTC: true,
                            acceptedPP: true,
                            emailVerified: true,
                        },
                    });
                }
                if (dbUser) {
                    authenticatedUserId = dbUser.id;
                    authenticatedRole = dbUser.role;
                }
            } catch (dbErr) {
                console.warn("[Auth Warning] Database sync skipped for system user, using system token:", dbErr);
            }
        } else {
            // 2. Standard Database Authentication
            let dbUser: any = null;
            try {
                dbUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
            } catch (dbErr) {
                console.error("[Auth Error] Database unreachable during sign-in:", dbErr);
                return NextResponse.json({ error: "Database service temporarily unavailable" }, { status: 503 });
            }

            if (!dbUser) {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }

            const valid = await bcrypt.compare(password, dbUser.password);
            if (!valid) {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }

            authenticatedUserId = dbUser.id;
            authenticatedRole = dbUser.role;
            authenticatedFirstName = dbUser.firstName || "User";
            authenticatedLastName = dbUser.lastName || "";
        }

        const ip = getClientIP(req);
        const userAgent = getUserAgent(req);
        const deviceInfo = getDeviceInfo(userAgent);
        const location = await getLocationFromIP(ip);

        // Deterministic or DB session
        let sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const refreshToken = generateRefreshToken();

        try {
            const dbSession = await prisma.session.create({
                data: {
                    userId: authenticatedUserId!,
                    ipAddress: ip,
                    userAgent,
                    device: deviceInfo.device,
                    browser: deviceInfo.browser,
                    os: deviceInfo.os,
                    city: location?.city,
                    country: location?.country,
                    region: location?.region,
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                    org: location?.org,
                },
            });

            if (dbSession) {
                sessionId = dbSession.id;
                await prisma.refreshToken.create({
                    data: {
                        token: refreshToken,
                        userId: authenticatedUserId!,
                        sessionId: dbSession.id,
                        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                });
                await logAction({ userId: authenticatedUserId!, action: "SIGNIN", ipAddress: ip, userAgent, deviceInfo });
            }
        } catch (sessionErr) {
            console.warn("[Auth Warning] Session logging to database skipped:", sessionErr);
        }

        const accessToken = signAccessToken({
            id: authenticatedUserId!,
            role: authenticatedRole,
            sessionId,
        });

        const redirectUrl =
            authenticatedRole === "ADMIN"
                ? "/admin/dashboard"
                : authenticatedRole === "USER"
                ? "/"
                : "/dashboard";

        const res = NextResponse.json({
            success: true,
            message: `Welcome, ${authenticatedFirstName}!`,
            role: authenticatedRole,
            redirectUrl,
            user: {
                id: authenticatedUserId,
                email: normalizedEmail,
                role: authenticatedRole,
                firstName: authenticatedFirstName,
                lastName: authenticatedLastName,
            },
        });

        // Set cookies with standard lax mode and root path
        res.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        if (rememberMe) {
            res.cookies.set("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 30 * 24 * 60 * 60,
            });
        }

        return res;
    } catch (error) {
        console.error("Sign-in server error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
