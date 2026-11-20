import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ["/signin", "/signup"];

// Middleware runs in Edge Runtime where node:crypto is unavailable, 
// so we decode the JWT payload manually. Token signature is verified in API routes.
function decodeJwtPayload(token: string) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get("accessToken")?.value;

    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    // 1. If no token, redirect to signin UNLESS it's an auth route
    if (!accessToken) {
        if (isAuthRoute) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    // 2. We have a token. Decode it.
    const decoded = decodeJwtPayload(accessToken);
    if (!decoded) {
        if (isAuthRoute) return NextResponse.next();
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (isAuthRoute) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/manager") && decoded.role !== "MANAGER") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/editor") && decoded.role !== "EDITOR") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/profile/:path*",
        "/dashboard/:path*",
        "/admin/:path*",
        "/manager/:path*",
        "/editor/:path*",
        "/signin",
        "/signup",
    ],
};