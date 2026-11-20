"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import verifyUser from "@/lib/auth/verifyUser";


export async function GetUserData() {
    const authResult = await verifyUser();

    if (!authResult || !authResult.user) {
        return {
            success: false,
            message: "User not found",
            data: null
        }
    }

    const { user, sessionId } = authResult;
    try {
        const userData = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                id: true,
                firstName: true,
                middleName: true,
                lastName: true,
                title: true,
                email: true,
                emailVerified: true,
                role: true,
                avatar: true,
                mobileNumber: true,
                occupation: true,
                institute: true,
                nationality: true,
                address: true,
                gender: true,
            }
        })

        if (!userData) {
            return {
                success: false,
                message: "User data not found in database",
                data: null
            }
        }

        const refreshToken = (await cookies()).get("refreshToken")?.value || "";

        return {
            success: true,
            message: "User data fetched successfully",
            data: { ...userData, sessionId, refreshToken }
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch user data",
            data: null
        }
    }

}

export async function LogoutSession(id: string, refreshToken: string) {
    try {
        const authResult = await verifyUser();
        if (!authResult || !authResult.user) {
            return { success: false, message: "User not found", data: null };
        }

        const { user } = authResult;

        // 🔐 Revoke tokens
        await prisma.refreshToken.updateMany({
            where: {
                token: refreshToken,
                sessionId: id
            },
            data: {
                revoked: true,
            },
        });

        // 📱 Deactivate session
        const sessionData = await prisma.session.update({
            where: { id: id },
            data: { isActive: false },
            select: {
                ipAddress: true,
                userAgent: true,
                device: true,
                browser: true,
                os: true,
            }
        });

        await prisma.auditLog.create({
            data: {
                userId: user.id,
                action: "LOGOUT",
                ipAddress: sessionData.ipAddress,
                userAgent: sessionData.userAgent,
                device: sessionData.device,
                browser: sessionData.browser,
                os: sessionData.os,
            },
        });

        const cookieStore = await cookies();

        cookieStore.set("accessToken", "", { expires: new Date(0) });
        cookieStore.set("refreshToken", "", { expires: new Date(0) });

        return {
            success: true,
            message: "Session logged out successfully",
            data: null
        };

    } catch (error) {
        return {
            success: false,
            message: "Failed to log out session",
            data: null
        };
    }
}

export async function LogoutAll(userId: string) {
    try {
        const authResult = await verifyUser();

        if (!authResult || !authResult.user) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        // 1. Deactivate all sessions
        const sessions = await prisma.session.updateMany({
            where: {
                userId,
                isActive: true,
            },
            data: {
                isActive: false,
            },
        });

        //  2. Revoke ALL refresh tokens
        await prisma.refreshToken.updateMany({
            where: {
                userId,
                revoked: false,
            },
            data: {
                revoked: true,
            },
        });

        // 3. Audit log
        await prisma.auditLog.create({
            data: {
                userId,
                action: "LOGOUT_ALL",
            },
        });

        // 4. Clear current device cookies
        const cookieStore = await cookies();

        cookieStore.set("accessToken", "", { expires: new Date(0) });
        cookieStore.set("refreshToken", "", { expires: new Date(0) });

        return {
            success: true,
            message: "Logged out from all devices",
        };

    } catch (error) {
        return {
            success: false,
            message: "Failed to logout all devices",
        };
    }
}
export async function getSessions() {
    try {
        const authResult = await verifyUser();

        if (!authResult || !authResult.user) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const { user } = authResult;

        const sessions = await prisma.session.findMany({
            where: {
                userId: user.id,
                isActive: true,
            },
            orderBy: {
                lastUsedAt: 'desc'
            }
        });

        return {
            success: true,
            message: "Sessions fetched successfully",
            data: sessions
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to fetch sessions",
            data: null
        };
    }
}

export async function getAuditLogs() {
    try {
        const authResult = await verifyUser();

        if (!authResult || !authResult.user) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const { user } = authResult;

        const logs = await prisma.auditLog.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {
            success: true,
            message: "Audit logs fetched successfully",
            data: logs
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to fetch audit logs",
            data: null
        };
    }
}

export async function getArticles() {
    try {
        const authResult = await verifyUser();

        if (!authResult || !authResult.user) {
            return {
                success: false,
                message: "Unauthorized",
                data: null
            };
        }

        const { user } = authResult;

        const articles = await prisma.article.findMany({
            where: {
                authorId: user.id,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {
            success: true,
            message: "Articles fetched successfully",
            data: articles
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to fetch articles",
            data: null
        };
    }
}
export type GetUserDataResponseType = NonNullable<Awaited<ReturnType<typeof GetUserData>>["data"]>;
export type GetSessionsResponseType = NonNullable<Awaited<ReturnType<typeof getSessions>>["data"]>;
export type GetAuditLogsResponseType = NonNullable<Awaited<ReturnType<typeof getAuditLogs>>["data"]>;
export type GetArticlesResponseType = NonNullable<Awaited<ReturnType<typeof getArticles>>["data"]>;