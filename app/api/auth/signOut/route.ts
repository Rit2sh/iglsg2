import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        // Try to audit and revoke if token and DB are accessible
        if (accessToken) {
            try {
                const decoded = verifyAccessToken(accessToken) as any;
                if (decoded && decoded.id && typeof decoded.id === "string" && !decoded.id.startsWith("sys_")) {
                    await prisma.session.updateMany({
                        where: { userId: decoded.id, isActive: true },
                        data: { isActive: false },
                    }).catch(() => { });
                }
            } catch {
                // Ignore token decode / DB failures during logout
            }
        }

        const response = NextResponse.json({
            success: true,
            message: "Signed out successfully",
        });

        // Clear auth cookies
        response.cookies.set("accessToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(0),
        });

        response.cookies.set("refreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(0),
        });

        return response;
    } catch (err: any) {
        // Fallback response that still clears cookies
        const response = NextResponse.json({
            success: true,
            message: "Signed out",
        });

        response.cookies.set("accessToken", "", { path: "/", expires: new Date(0) });
        response.cookies.set("refreshToken", "", { path: "/", expires: new Date(0) });

        return response;
    }
}
