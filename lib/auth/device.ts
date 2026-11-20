
import { UAParser } from "ua-parser-js";

export function getClientIP(req: Request) {
    return req.headers.get("x-forwarded-for") || "unknown";
}

export function getUserAgent(req: Request) {
    return req.headers.get("user-agent") || "unknown";
}


export function getDeviceInfo(userAgent: string) {
    const parser = new UAParser(userAgent);

    const device = parser.getDevice().type || "desktop";
    const browser = parser.getBrowser().name || "unknown";
    const os = parser.getOS().name || "unknown";

    return { device, browser, os };
}