import { getClientIP, getDeviceInfo, getUserAgent } from "@/lib/auth/device";
import { logAction } from "@/lib/auth/audit";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signAccessToken } from "@/lib/auth/jwt";
import { getLocationFromIP } from "@/lib/auth/getLocation";
import { generateRefreshToken } from "@/lib/auth/tokens";


export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, password, confirmPassword, terms } = await req.json();
        if (!terms) {
            return NextResponse.json(
                { message: "You must accept the terms and conditions", error: true },
                { status: 400 }
            );
        }
        if (password !== confirmPassword) {
            return NextResponse.json(
                { message: "Passwords do not match", error: true },
                { status: 400 }
            );
        }

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required", error: true },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists", error: true },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                acceptedTC: terms,
                acceptedPP: terms,
            },
        });

        const ip = getClientIP(req);
        const userAgent = getUserAgent(req);
        const deviceInfo = getDeviceInfo(userAgent);
        const location = await getLocationFromIP(ip);
        // create session
        const session = await prisma.session.create({
            data: {
                userId: newUser.id,
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

        const accessToken = signAccessToken({ id: newUser.id, role: newUser.role, sessionId: session.id });
        const refreshToken = generateRefreshToken();
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: newUser.id,
                sessionId: session.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        await logAction({ userId: newUser.id, action: "SIGNUP", ipAddress: ip, userAgent, deviceInfo });

        const res = NextResponse.json({ success: true, message: "User created successfully" });

        res.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });

        return res;

    } catch (error) {
        console.error("Error in signup", error);
        return NextResponse.json(
            { message: "Internal server error", error: true },
            { status: 500 }
        );
    }
}