import prisma from "../prisma";
import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";


export default async function verifyUser() {
    try {
        const token = (await cookies()).get("accessToken")?.value;

        if (!token) return null;

        const decoded: any = verifyAccessToken(token);
        if (!decoded) return null;

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
            }
        });

        if (!user) return null;

        const session = await prisma.session.findUnique({
            where: { id: decoded.sessionId },
            select: {
                id: true,
                isActive: true,
            }
        });

        if (!session || !session.isActive) return null;

        return { user, sessionId: session.id };
    } catch (error) {
        return null;
    }
}
