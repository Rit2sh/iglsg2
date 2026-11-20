import jwt from "jsonwebtoken";

export function signAccessToken(payload: any) {
    return jwt.sign(payload, process.env.ACCESS_SECRET!);
}

export function verifyAccessToken(token: string) {
    try {
        return jwt.verify(token, process.env.ACCESS_SECRET!);
    } catch (error) {
        return null;
    }
}

