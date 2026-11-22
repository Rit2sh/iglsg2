import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CreditCard, QrCode, ShieldCheck, CheckCircle2, FileSearch } from "lucide-react";
import { JOURNALS, formatINR } from "@/lib/submission/journals";

export const metadata: Metadata = {
    title: "Publication Fee & Payment Portal | Axiara Journals Wing",
    description: "Official publication payment portal, APC fee schedule, UPI payment details, and UTR submission for Axiara Journals.",
};

export default function PaymentPage() {
    return (
        <main className="min-h-screen bg-[#f5f9ff] dark:bg-slate-950 py-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Hero */}
                <div className="text-center space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0755ad] bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
                        Official Publication Fee Portal
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#061a43] dark:text-white tracking-tight">
                        Axiara Journals Payment Gateway
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
                        Transparent Article Processing Charges (APC), instant UPI payments, bank wire transfers, and verification.
                    </p>
                </div>

                {/* Quick actions card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <span className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-[#0755ad] flex items-center justify-center font-bold">
                                📝
                            </span>
                            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
                                New Manuscript Submission &amp; Payment
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Complete your 3-step author submission, review calculated publication fees with GST, and submit your UTR reference proof.
                            </p>
                        </div>
                        <Link
                            href="/submission"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#075dc0] to-[#001e65] text-white font-extrabold text-sm py-3 px-5 rounded-xl shadow hover:brightness-110 transition-all"
                        >
                            Open Manuscript Submission Wizard <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <span className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                                🔍
                            </span>
                            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
                                Direct UPI Transfer &amp; Settlement
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Already have an assigned Manuscript ID from the editorial desk? Pay directly using the official corporate VPA:
                            </p>
                            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg font-mono font-bold text-sm text-[#092d68] dark:text-blue-300">
                                axiara.journals@upi
                            </div>
                        </div>
                        <Link
                            href="/submission"
                            className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300 py-3 px-5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Submit UTR for Existing Manuscript <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* APC Fee Structure Summary */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                        <h3 className="font-extrabold text-base text-[#061a43] dark:text-white">
                            Standard Journal APC Fee Schedules (Excluding 18% GST)
                        </h3>
                        <p className="text-xs text-slate-500">
                            Article Processing Charges cover double-blind peer review, typesetting, DOI registration, and open-access hosting.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.values(JOURNALS).map((j) => (
                            <div
                                key={j.id}
                                className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 text-xs"
                            >
                                <span className="font-extrabold text-sm text-[#092d68] dark:text-blue-300 block">
                                    {j.name}
                                </span>
                                <div className="text-slate-500 font-mono text-[11px]">{j.issn}</div>
                                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Base APC (Lead Author):</span>
                                        <b className="text-slate-800 dark:text-slate-200">{formatINR(j.base)}</b>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>2nd Author Charge:</span>
                                        <b className="text-slate-800 dark:text-slate-200">{formatINR(j.second)}</b>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>3rd–6th Author:</span>
                                        <b className="text-slate-800 dark:text-slate-200">
                                            {j.later > 0 ? `${formatINR(j.later)} each` : "N/A"}
                                        </b>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Crossref DOI Option:</span>
                                        <b className="text-slate-800 dark:text-slate-200">{formatINR(j.doi)}</b>
                                    </div>
                                    <div className="flex justify-between text-blue-600 font-bold">
                                        <span>Author Limit:</span>
                                        <span>Max {j.max} Authors</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
