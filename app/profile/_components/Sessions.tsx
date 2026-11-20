// Inside Sessions.tsx
import { Monitor, Smartphone, Globe, CheckCircle2 } from "lucide-react";
import Logout from "./Logout";
import { Badge } from "@/components/ui/badge";
// import { GetUserDataResponseType } from "../actions";
interface ISession {
    id: string;
    ipAddress: string;
    userAgent: string;
    device: string;
    browser: string;
    os: string;
    refreshTokens: {
        token: string;
    }[];
}
export default function Sessions({ sessionsData, sessionId }: { sessionsData: ISession[], sessionId: string }) {

    return (
        <div className="space-y-4">
            {sessionsData?.map((s: ISession) => {
                const isCurrent = s.id === sessionId;
                return (
                    <div key={s.id} className={`group relative p-4 rounded-xl border transition-all ${isCurrent ? "bg-primary/5 border-primary/30" : "hover:bg-muted/50"}`}>
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3">
                                {s.device?.toLowerCase().includes('phone') ? <Smartphone className="h-5 w-5 mt-1" /> : <Monitor className="h-5 w-5 mt-1" />}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold">{s.browser || "Unknown Browser"}</p>
                                        {isCurrent && (
                                            <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 border-green-200">
                                                Active Now
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">{s.ipAddress} • {s.device || "Desktop"}</p>
                                </div>
                            </div>

                            {!isCurrent && s.refreshTokens?.[0]?.token && (
                                <Logout id={s.id} refreshToken={s.refreshTokens[0].token} variant="ghost" />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}