import prisma from "../prisma";
import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";
import { findSystemAccountById } from "./systemUsers";

export default async function verifyUser() {
    try {
        const token = (await cookies()).get("accessToken")?.value;
        if (!token) return null;

        const decoded: any = verifyAccessToken(token);
        if (!decoded || !decoded.id) return null;

        const systemAcc = findSystemAccountById(decoded.id);
        if (systemAcc) {
            return {
                user: {
                    id: systemAcc.id,
                    email: systemAcc.email,
                    firstName: systemAcc.firstName,
                    lastName: systemAcc.lastName,
                    role: systemAcc.role,
                },
                sessionId: decoded.sessionId,
            };
        }

        try {
            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                },
            });

            if (!user) return null;
            return { user, sessionId: decoded.sessionId };
        } catch {
            return {
                user: {
                    id: decoded.id,
                    email: "user@ijlsg.org",
                    firstName: "User",
                    lastName: "",
                    role: decoded.role || "USER",
                },
                sessionId: decoded.sessionId,
            };
        }
    } catch {
        return null;
    }
}
