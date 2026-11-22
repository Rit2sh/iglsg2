"use client";

import React from "react";
import { Check } from "lucide-react";

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
        { num: 1, label: "1. Manuscript & Authors" },
        { num: 2, label: "2. Payment Details Review" },
        { num: 3, label: "3. Payment & Final Submission" },
    ];

    return (
        <nav aria-label="Submission progress" className="my-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
                {steps.map((s) => {
                    const isDone = completedSteps.includes(s.num);
                    const isCurrent = currentStep === s.num;
                    const canClick = isDone || isCurrent;

                    return (
                        <button
                            key={s.num}
                            type="button"
                            disabled={!canClick}
                            onClick={() => canClick && onStepClick?.(s.num as 1 | 2 | 3)}
                            className={`p-3.5 text-left flex items-center gap-3 text-sm font-semibold select-none ${
                                isCurrent
                                    ? "bg-[#061a43] text-white"
                                    : isDone
                                    ? "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100"
                                    : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                            }`}
                        >
                            <span
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                    isCurrent
                                        ? "bg-white text-[#061a43]"
                                        : isDone
                                        ? "bg-emerald-600 text-white"
                                        : "border border-slate-300 dark:border-slate-700 text-slate-400"
                                }`}
                            >
                                {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : s.num}
                            </span>
                            <span className="truncate">{s.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
