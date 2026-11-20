import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const token = (await cookies()).get("accessToken")?.value;
        const refreshToken = (await cookies()).get("refreshToken")?.value;

        if (!token) return NextResponse.json({ user: null, sessionId: null });

        const decoded: any = verifyAccessToken(token);
        if (!decoded) return NextResponse.json({ user: null, sessionId: null });

        const session = await prisma.session.findUnique({
            where: { id: decoded.sessionId },
            select: {
                id: true,
                isActive: true,
                refreshTokens: {
                    where: {
                        token: refreshToken,
                    },
                    select: {
                        revoked: true,
                        expiresAt: true,
                    },
                },
            }
        });

        // if (!session || !session.isActive || refreshToken.revoked || refreshToken.expiresAt) {
        //     const res = NextResponse.json({ user: null, sessionId: null });
        //     res.cookies.set("accessToken", "", { expires: new Date(0) });
        //     res.cookies.set("refreshToken", "", { expires: new Date(0) });
        //     return res;
        // }

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                middleName: true,
                role: true,
                avatar: true,
                mobileNumber: true,
                occupation: true,
                institute: true,
                nationality: true,
                address: true,
                gender: true,
            }
        });

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ user: null });
    }
}