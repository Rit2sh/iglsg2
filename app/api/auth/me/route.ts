import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { NextResponse } from "next/server";
import { findSystemAccountById } from "@/lib/auth/systemUsers";

export async function GET() {
    try {
        const token = (await cookies()).get("accessToken")?.value;

        if (!token) return NextResponse.json({ user: null, sessionId: null });

        const decoded: any = verifyAccessToken(token);
        if (!decoded || !decoded.id) return NextResponse.json({ user: null, sessionId: null });

        // Check if user is a system account
        const systemAcc = findSystemAccountById(decoded.id);
        if (systemAcc) {
            return NextResponse.json({
                user: {
                    id: systemAcc.id,
                    email: systemAcc.email,
                    firstName: systemAcc.firstName,
                    lastName: systemAcc.lastName,
                    role: systemAcc.role,
                    occupation: systemAcc.designation,
                    institute: systemAcc.institution,
                },
                sessionId: decoded.sessionId,
            });
        }

        // Standard database lookup
        try {
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
                },
            });

            return NextResponse.json({ user, sessionId: decoded.sessionId });
        } catch (dbErr) {
            // Fallback to basic decoded token data if database is temporarily unavailable
            return NextResponse.json({
                user: {
                    id: decoded.id,
                    role: decoded.role || "USER",
                    firstName: "Authenticated",
                    lastName: "User",
                },
                sessionId: decoded.sessionId,
            });
        }
    } catch {
        return NextResponse.json({ user: null });
    }
}
