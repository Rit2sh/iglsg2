import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signAccessToken } from "@/lib/auth/jwt";
import { generateRefreshToken } from "@/lib/auth/tokens";
import { getClientIP, getDeviceInfo, getUserAgent } from "@/lib/auth/device";
import { logAction } from "@/lib/auth/audit";
import { getLocationFromIP } from "@/lib/auth/getLocation";

export async function POST(req: Request) {
    try {
        const { email, password, rememberMe } = await req.json();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return NextResponse.json({ error: "Invalid" }, { status: 401 });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return NextResponse.json({ error: "Invalid" }, { status: 401 });

        const ip = getClientIP(req);
        const userAgent = getUserAgent(req);
        const deviceInfo = getDeviceInfo(userAgent);
        const location = await getLocationFromIP(ip);

        // create session
        const session = await prisma.session.create({
            data: {
                userId: user.id,
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

        const accessToken = signAccessToken({ id: user.id, role: user.role, sessionId: session.id });
        const refreshToken = generateRefreshToken();

        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                sessionId: session.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        await logAction({ userId: user.id, action: "SIGNIN", ipAddress: ip, userAgent, deviceInfo });

        const res = NextResponse.json({ success: true, message: "Signed in successfully" });

        res.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });
        if (rememberMe) {
            res.cookies.set("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
            });
        }

        return res;
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}