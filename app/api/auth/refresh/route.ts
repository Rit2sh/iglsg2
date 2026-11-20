import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { signAccessToken } from "@/lib/auth/jwt";
import { generateRefreshToken } from "@/lib/auth/tokens";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const token = (await cookies()).get("refreshToken")?.value;
        if (!token) return NextResponse.json({}, { status: 401 });

        const existing = await prisma.refreshToken.findUnique({
            where: { token },
        });

        if (!existing || existing.revoked) {
            return NextResponse.json({}, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: existing.userId },
        });

        if (!user) {
            return NextResponse.json({}, { status: 401 });
        }

        // ROTATE
        await prisma.refreshToken.update({
            where: { token },
            data: { revoked: true },
        });

        const access = signAccessToken({ id: user!.id, role: user!.role, sessionId: existing.sessionId });
        // const newRefresh = generateRefreshToken({ id: user!.id, role: user!.role });
        const res = NextResponse.json({ success: true });

        res.cookies.set("accessToken", access);

        return res;
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}