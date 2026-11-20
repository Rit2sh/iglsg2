import prisma from "@/lib/prisma";

export interface LogActionParams {
    userId?: string;
    action: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    deviceInfo: {
        device: string;
        browser: string;
        os: string;
    };
}

export async function logAction({
    userId,
    action,
    ipAddress,
    userAgent,
    deviceInfo,
}: LogActionParams) {
    await prisma.auditLog.create({
        data: {
            userId,
            action,
            ipAddress,
            userAgent,
            device: deviceInfo.device,
            browser: deviceInfo.browser,
            os: deviceInfo.os,
        },
    });
}