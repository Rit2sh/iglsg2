export function setAuthCookies(res: any, access: string, refresh: string) {
    res.cookies.set("accessToken", access, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
    });

    res.cookies.set("refreshToken", refresh, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
    });
}

export function deleteAuthCookies(res: any) {
    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");
}