"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardProgressProps {
    currentStep: 1 | 2 | 3;
    onStepClick?: (step: 1 | 2 | 3) => void;
    completedSteps: number[];
}

export default function WizardProgress({
    currentStep,
    onStepClick,
    completedSteps,
}: WizardProgressProps) {
    const steps = [
        { num: 1, label: "Manuscript, Authors & File Upload" },
        { num: 2, label: "Payment Details (Review of Amount)" },
        { num: 3, label: "Axiara Payment Portal & Final Submission" },
    ];

    return (
        <section className="relative my-6 px-4 md:px-12" aria-label="Submission progress">
            {/* Connecting line */}
            <div className="hidden sm:block absolute left-[16%] right-[16%] top-[19px] h-[3px] bg-[#0c2556]/20 dark:bg-blue-900/40 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 relative z-10">
                {steps.map((s) => {
                    const isDone = completedSteps.includes(s.num);
                    const isCurrent = currentStep === s.num;
                    const canClick = isDone || isCurrent;

                    return (
                        <div
                            key={s.num}
                            onClick={() => canClick && onStepClick?.(s.num as 1 | 2 | 3)}
                            className={cn(
                                "flex sm:flex-col items-center gap-3 sm:gap-1.5 text-left sm:text-center transition-all",
                                canClick ? "cursor-pointer" : "opacity-60 cursor-not-allowed"
                            )}
                        >
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all shadow-sm",
                                    isDone
                                        ? "bg-emerald-600 border-emerald-600 text-white shadow-emerald-500/20"
                                        : isCurrent
                                        ? "bg-[#092d68] border-[#092d68] text-[#ffe66b] ring-4 ring-blue-100 dark:ring-blue-950"
                                        : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                                )}
                            >
                                {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : s.num}
                            </div>
                            <span
                                className={cn(
                                    "text-xs md:text-sm font-semibold tracking-tight transition-all rounded-full px-3 py-1",
                                    isCurrent
                                        ? "bg-[#092d68] text-white"
                                        : isDone
                                        ? "text-emerald-700 dark:text-emerald-400 font-bold"
                                        : "text-slate-600 dark:text-slate-400"
                                )}
                            >
                                {s.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
