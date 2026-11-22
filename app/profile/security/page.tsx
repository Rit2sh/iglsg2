import verifyUser from "@/lib/auth/verifyUser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, Monitor, Globe, LogOut, CheckCircle2, MapPin, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSessions } from "../actions";
import { getLocationFromIP } from "@/lib/auth/getLocation";

function getDeviceIcon(device: string | null) {
    if (!device) return <Monitor className="w-8 h-8 text-muted-foreground" />;
    const normalized = device.toLowerCase();
    if (normalized.includes("mobile") || normalized.includes("iphone") || normalized.includes("android")) {
        return <Smartphone className="w-8 h-8 text-primary" />;
    }
    return <Monitor className="w-8 h-8 text-primary" />;
}

export default async function SecurityPage() {
    const data = await verifyUser();
    if (!data) return <div className="p-8 text-center text-muted-foreground animate-pulse">Unauthorized</div>;

    const { data: sessions } = await getSessions();
    const activeSessions: any[] = (sessions && sessions.length > 0) ? sessions : [
        {
            id: data.sessionId || "current_session",
            device: "Desktop Browser",
            browser: "Chrome / Web",
            os: "Current Device",
            ipAddress: "127.0.0.1",
            city: "Delhi",
            country: "India",
            userAgent: "Mozilla/5.0",
            isActive: true,
            lastUsedAt: new Date(),
            createdAt: new Date(),
            userId: data.user.id,
            expiresAt: null,
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Security &amp; Devices</h1>
                <p className="text-muted-foreground mt-1 text-lg">
                    Manage your active sessions and connected devices.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeSessions.map((s) => {
                    const isCurrent = s.id === data.sessionId || activeSessions.length === 1;

                    return (
                        <Card
                            key={s.id}
                            className={cn(
                                "flex flex-col overflow-hidden transition-all duration-300",
                                isCurrent ? "border-primary shadow-md shadow-primary/10" : "border-border/50 hover:shadow-md",
                                !s.isActive && "opacity-60 grayscale-[0.5]"
                            )}
                        >
                            <CardHeader className="bg-muted/10 pb-4 border-b border-border/50">
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        {getDeviceIcon(s.device)}
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {isCurrent && (
                                            <Badge variant="default" className="bg-primary text-primary-foreground shadow-sm">
                                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                                Current
                                            </Badge>
                                        )}
                                        {s.isActive && !isCurrent && (
                                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/30 dark:border-green-800">
                                                Active
                                            </Badge>
                                        )}
                                        {!s.isActive && (
                                            <Badge variant="secondary" className="text-muted-foreground bg-muted">
                                                <XCircle className="w-3 h-3 mr-1" />
                                                Logged Out
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <CardTitle className="text-xl mt-4">{s.os || "Unknown OS"}</CardTitle>
                                <CardDescription className="text-sm font-medium">
                                    {s.browser || "Unknown Browser"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="py-5 space-y-4 flex-1 text-sm bg-card">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Globe className="w-5 h-5 opacity-70 text-primary" />
                                    <span className="font-mono bg-muted px-2 py-1 rounded-md text-xs">{s.ipAddress || "Unknown IP"}</span>
                                </div>
                                <LocationCard ip={s.ipAddress || ""} />
                                {(s.city || s.country) && (
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <MapPin className="w-5 h-5 opacity-70 text-primary" />
                                        <span className="font-medium">
                                            {[s.city, s.region, s.country].filter(Boolean).join(", ")}
                                        </span>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="pt-3 border-t border-border/50 bg-muted/5">
                                {s.isActive && !isCurrent && (
                                    <Button variant="outline" size="sm" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all font-medium">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Revoke Session
                                    </Button>
                                )}
                                {isCurrent && (
                                    <div className="w-full text-center text-xs font-medium text-primary py-1.5 bg-primary/5 rounded-md">
                                        This is your current device
                                    </div>
                                )}
                                {!s.isActive && (
                                    <div className="w-full text-center text-xs text-muted-foreground py-1.5">
                                        Session expired on {new Date(s.lastUsedAt).toLocaleDateString()}
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}


const LocationCard = async ({ ip }: { ip: string }) => {
    const location = await getLocationFromIP(ip);
    return (
        <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-5 h-5 opacity-70 text-primary" />
            <span className="font-medium">
                {location?.city}, {location?.country}
            </span>
        </div>
    );
}