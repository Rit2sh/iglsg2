// app/dashboard/board/_components/EBVerificationStatus.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, Clock, AlertCircle } from "lucide-react";

export default function EBVerificationStatus() {
    // These values would typically come from your database
    const totalMembers = 15;
    const verifiedMembers = 12;
    const verificationRate = (verifiedMembers / totalMembers) * 100;

    return (
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="bg-emerald-50/50 dark:bg-emerald-950/20 border-b pb-4">
                <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-emerald-700 dark:text-emerald-500">
                    <ShieldCheck size={16} /> Board Integrity Status
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                        <span className="text-slate-400">Verification Rate</span>
                        <span className="text-emerald-600">{Math.round(verificationRate)}%</span>
                    </div>
                    <Progress value={verificationRate} className="h-2 bg-slate-100" />
                </div>

                {/* Status List */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-amber-500" />
                            <span className="text-xs font-semibold text-slate-600">Pending (5-Day Window)</span>
                        </div>
                        <span className="text-xs font-bold text-slate-900">3</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <AlertCircle size={14} className="text-red-500" />
                            <span className="text-xs font-semibold text-slate-600">Unresponsive / Flagged</span>
                        </div>
                        <span className="text-xs font-bold text-slate-900">0</span>
                    </div>
                </div>

                <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    Note: Per ISSN India policy, board members who do not verify within 5 days must be removed from the public listing.
                </p>
            </CardContent>
        </Card>
    );
}