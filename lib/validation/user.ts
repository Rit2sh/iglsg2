import { z } from "zod";

export const sessionSchema = z.object({
    id: z.string(),
    ipAddress: z.string().nullable(),
    device: z.string().nullable(),
    browser: z.string().nullable(),
    os: z.string().nullable(),
    createdAt: z.date(),
});

export const auditLogSchema = z.object({
    id: z.string(),
    action: z.string(),
    ipAddress: z.string().nullable(),
    device: z.string().nullable(),
    createdAt: z.date(),
});

export const userSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    role: z.string(),

    sessions: z.array(sessionSchema),
    auditLogs: z.array(auditLogSchema),
});

export type UserResponseType = z.infer<typeof userSchema>;