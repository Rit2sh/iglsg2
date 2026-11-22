"use client";

import { Loader2 } from "lucide-react";

export default function PreLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-xs">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
                    J
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                    <span>Loading portal...</span>
                </div>
            </div>
        </div>
    );
}
