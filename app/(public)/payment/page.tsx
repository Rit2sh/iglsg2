import type { Metadata } from "next";
import Link from "next/link";
import { JOURNALS, formatINR } from "@/lib/submission/journals";

export const metadata: Metadata = {
    title: "Publication Fee & Payment Portal | Axiara Journals Wing",
    description: "Official publication payment portal, APC fee schedule, UPI payment details, and UTR submission for Axiara Journals.",
};

export default function PaymentPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 md:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1">
                        Axiara Journals Wing
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                        Publication Fees &amp; Payment Portal
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                        Transparent Article Processing Charges (APC), direct UPI transfers, and payment verification.
                    </p>
                </div>

                {/* Quick actions cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <h2 className="font-bold text-base text-slate-900 dark:text-slate-100">
                                New Manuscript Submission &amp; Payment
                            </h2>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Complete your 3-step author submission, review calculated publication fees with separate GST, and submit your transaction UTR number.
                            </p>
                        </div>
                        <Link
                            href="/submission"
                            className="inline-flex items-center justify-center bg-[#061a43] hover:bg-[#00245d] text-white font-semibold text-xs py-2.5 px-4 rounded"
                        >
                            Open Submission Wizard &rarr;
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <h2 className="font-bold text-base text-slate-900 dark:text-slate-100">
                                Direct UPI Transfer
                            </h2>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                For manuscripts with an assigned reference ID from editorial desk, transfer directly to the official VPA:
                            </p>
                            <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
                                axiara.journals@upi
                            </div>
                        </div>
                        <Link
                            href="/submission"
                            className="inline-flex items-center justify-center border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs py-2.5 px-4 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                            Submit UTR for Existing Manuscript &rarr;
                        </Link>
                    </div>
                </div>

                {/* APC Fee Structure Summary */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 space-y-4">
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                        <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                            Standard Journal APC Fee Schedules (Exclusive of 18% GST)
                        </h2>
                        <p className="text-xs text-slate-500">
                            Article Processing Charges support peer review coordination, digital preservation, DOI registration, and open-access hosting.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.values(JOURNALS).map((j) => (
                            <div
                                key={j.id}
                                className="border border-slate-200 dark:border-slate-800 rounded p-4 bg-slate-50/50 dark:bg-slate-800/30 space-y-2 text-xs"
                            >
                                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">
                                    {j.name}
                                </span>
                                <div className="text-slate-500 font-mono text-[11px]">{j.issn}</div>
                                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1.5">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Base APC (Lead Author):</span>
                                        <b className="text-slate-900 dark:text-slate-100">{formatINR(j.base)}</b>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">2nd Author:</span>
                                        <b className="text-slate-900 dark:text-slate-100">{formatINR(j.second)}</b>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">3rd–6th Authors:</span>
                                        <b className="text-slate-900 dark:text-slate-100">
                                            {j.later > 0 ? `${formatINR(j.later)} each` : "N/A"}
                                        </b>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Crossref DOI:</span>
                                        <b className="text-slate-900 dark:text-slate-100">{formatINR(j.doi)}</b>
                                    </div>
                                    <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold pt-1 border-t border-slate-200 dark:border-slate-700">
                                        <span>Max Author Limit:</span>
                                        <span>{j.max} Authors</span>
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
