"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, ShieldCheck, Cpu, Globe } from "lucide-react";

export default function PreLoader() {
    const [statusIndex, setStatusIndex] = useState(0);
    const statuses = [
        "Initializing JIAS Portal...",
        "Verifying SSL Encryption...",
        "Fetching Latest Volumes...",
        "Syncing Editorial Board...",
        "Authenticating Peer-Review Hub..."
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % statuses.length);
        }, 800);
        return () => clearInterval(timer);
    }, [statuses.length]);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#020617]">
            {/* Background Ambient Orbs (Matches your Login Page) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#1E3A8A] opacity-5 blur-[120px]" />
            </div>

            <div className="relative flex flex-col items-center">
                {/* The "Manuscript" Icon with Scanning Beam */}
                <div className="relative w-24 h-32 bg-white dark:bg-[#0F172A] border-2 border-[#E2E8F0] dark:border-[#1E293B] rounded-lg shadow-2xl flex items-center justify-center mb-8 overflow-hidden">
                    {/* Paper Lines */}
                    <div className="absolute inset-0 p-4 space-y-3 opacity-20">
                        <div className="h-2 w-full bg-slate-300 dark:bg-slate-700 rounded" />
                        <div className="h-2 w-3/4 bg-slate-300 dark:bg-slate-700 rounded" />
                        <div className="h-2 w-full bg-slate-300 dark:bg-slate-700 rounded" />
                        <div className="h-2 w-1/2 bg-slate-300 dark:bg-slate-700 rounded" />
                    </div>

                    <Newspaper className="w-10 h-10 text-[#1E3A8A] dark:text-[#3B82F6] relative z-10" />

                    {/* Animated Scanning Beam */}
                    <motion.div
                        initial={{ top: "-10%" }}
                        animate={{ top: "110%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent shadow-[0_0_15px_rgba(14,165,233,0.8)] z-20"
                    />
                </div>

                {/* Branding */}
                <div className="text-center space-y-2 relative z-10">
                    <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F1F5F9]"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        JIAS
                    </h2>

                    {/* Dynamic Status Text */}
                    <div className="h-6 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={statuses[statusIndex]}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-[0.15em] flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
                                {statuses[statusIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer badges (Matches your aesthetic) */}
                <div className="absolute bottom-[-100px] flex gap-6 opacity-40 grayscale">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                        <ShieldCheck size={14} /> 256-BIT SECURE
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                        <Globe size={14} /> GLOBAL ACCESS
                    </div>
                </div>
            </div>
        </div>
    );
}