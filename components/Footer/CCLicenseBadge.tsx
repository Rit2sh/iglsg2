import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

function CCIcon({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn(
            "w-7 h-7 rounded-full border border-white/20 flex items-center justify-center bg-black/40",
            className
        )}>
            {children}
        </div>
    );
}

export default function CCLicenseBadge() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 bg-white/5 p-5 border border-white/5 transition-colors hover:bg-white/10">

            {/* Visual Badge Group */}

            <div className="">
                <Image
                    src="/images/footer/cc.jpeg"
                    alt="CC Logo"
                    width={250}
                    height={100}
                    className="object-contain border border-white/10 rounded-md"
                />
            </div>

            {/* License Text */}
            <div className="space-y-1 text-center md:text-left">
                <p className="text-[12.5px] leading-relaxed text-white/70">
                    All content published in this journal is distributed under the terms of the
                    <span className="text-white font-medium ml-1">
                        Creative Commons Attribution–Non-Commercial–No-Derivatives 4.0 International License
                    </span>.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                    <span>Open Access</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>Free for Readers</span>
                </div>
            </div>
        </div>
    );
}