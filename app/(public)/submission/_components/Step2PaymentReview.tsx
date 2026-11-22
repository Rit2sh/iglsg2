"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Tag, ShieldCheck, Info } from "lucide-react";
import { JOURNALS, calculateFees, formatINR, validateReferralCodeLocal } from "@/lib/submission/journals";
import { SubmissionFormData } from "@/lib/submission/types";

interface Step2Props {
    data: SubmissionFormData;
    onChange: (updates: Partial<SubmissionFormData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Step2PaymentReview({ data, onChange, onNext, onBack }: Step2Props) {
    const [codeVal, setCodeVal] = useState(data.appliedWaiverCode || "");
    const [codeStatus, setCodeStatus] = useState<{
        type: "success" | "error" | "none";
        message: string;
    }>({
        type: data.appliedWaiverCode ? "success" : "none",
        message: data.waiverLabel ? `✓ ${data.waiverLabel} applied.` : "",
    });

    const journal = JOURNALS[data.journalId] || JOURNALS.j1;
    const authorCount = data.authors.length;

    // Calculate fees
    const fees = calculateFees(
        data.journalId,
        authorCount,
        data.includeDoi,
        data.waiverDiscountPercent || 0,
        data.waiverDiscountAmount || 0
    );

    const handleApplyCode = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const code = codeVal.trim();
        if (!code) {
            setCodeStatus({
                type: "error",
                message: "Please enter a fee-waiver, referral or exemption code.",
            });
            return;
        }

        // Check local referral codes first
        const localCheck = validateReferralCodeLocal(code);
        if (localCheck.valid) {
            onChange({
                appliedWaiverCode: localCheck.code,
                waiverDiscountPercent: localCheck.percent || 0,
                waiverLabel: localCheck.label,
            });
            setCodeStatus({
                type: "success",
                message: localCheck.message || "Code applied successfully.",
            });
            return;
        }

        // Try server validation endpoint if available
        try {
            const res = await fetch("/api/fee-waivers/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code,
                    journalId: data.journalId,
                    includeDoi: data.includeDoi,
                    authorCount,
                    manuscriptId: data.manuscriptId,
                }),
            });
            const resData = await res.json();
            if (res.ok && resData.valid) {
                onChange({
                    appliedWaiverCode: code.toUpperCase(),
                    waiverDiscountPercent: resData.percent || 0,
                    waiverDiscountAmount: resData.waiverAmount || 0,
                    waiverLabel: resData.label || "Approved Fee Waiver",
                });
                setCodeStatus({
                    type: "success",
                    message: `✓ ${resData.label || "Fee exemption"} successfully applied.`,
                });
            } else {
                onChange({
                    appliedWaiverCode: undefined,
                    waiverDiscountPercent: 0,
                    waiverDiscountAmount: 0,
                    waiverLabel: undefined,
                });
                setCodeStatus({
                    type: "error",
                    message: resData.message || "Invalid, expired, or unrecognized fee-waiver code.",
                });
            }
        } catch {
            setCodeStatus({
                type: "error",
                message: "Invalid or unrecognized referral code.",
            });
        }
    };

    const handleClearCode = () => {
        setCodeVal("");
        onChange({
            appliedWaiverCode: undefined,
            waiverDiscountPercent: 0,
            waiverDiscountAmount: 0,
            waiverLabel: undefined,
        });
        setCodeStatus({ type: "none", message: "" });
    };

    return (
        <div className="space-y-6">
            {/* Header bar */}
            <div className="bg-gradient-to-r from-[#0a3479] to-[#001d51] text-white rounded-xl px-5 py-3.5 shadow-md flex items-center justify-between">
                <span className="font-extrabold text-lg md:text-xl flex items-center gap-2">
                    <span>▤</span> Step 2 of 3: Payment Details (Review of Amount)
                </span>
                <span className="text-xs bg-[#ffe66b] text-[#061a43] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {data.manuscriptId}
                </span>
            </div>

            {/* Top Grid: Submission Summary & Fee Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Card: Submission Summary */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
                    <div>
                        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950/60 dark:to-indigo-950/60 px-5 py-3 border-b border-blue-200 dark:border-blue-900 text-[#092d94] dark:text-blue-300 font-extrabold text-base flex items-center gap-2">
                            <span>📋</span> Submission Summary
                        </div>
                        <div className="p-5 space-y-3.5 text-xs">
                            <div className="flex justify-between items-start pb-2 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 font-bold uppercase">Manuscript ID</span>
                                <span className="font-extrabold bg-[#fff1a8] text-[#0b246c] px-2.5 py-0.5 rounded-md font-mono text-xs">
                                    {data.manuscriptId}
                                </span>
                            </div>
                            <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 font-bold uppercase block mb-1">Journal</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                                    {journal.name}
                                </span>
                            </div>
                            <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 font-bold uppercase block mb-1">Title</span>
                                <p className="font-semibold text-slate-700 dark:text-slate-300 line-clamp-2">
                                    {data.title || "Untitled Manuscript"}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <span className="text-slate-500 font-bold uppercase block mb-1">Category</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {data.category}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500 font-bold uppercase block mb-1">Author Count</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {authorCount} Author{authorCount > 1 ? "s" : ""}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="text-slate-500 font-bold uppercase block mb-1">Corresponding Author</span>
                                <p className="font-bold text-slate-800 dark:text-slate-200">{data.authors[0]?.name}</p>
                                <p className="text-slate-500 text-[11px]">{data.correspondingEmail}</p>
                                <p className="text-slate-500 text-[11px]">{data.correspondingMobile}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                        Need changes in authors or title? Click <b>&quot;Edit Submission&quot;</b> below before proceeding.
                    </div>
                </div>

                {/* Right Card: Fee Breakdown Table & Options */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950/60 dark:to-indigo-950/60 px-5 py-3 border-b border-blue-200 dark:border-blue-900 text-[#092d94] dark:text-blue-300 font-extrabold text-base flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <span>💳</span> Article Processing Charges (APC)
                        </span>
                        <span className="text-xs bg-blue-50 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-2.5 py-0.5 rounded-full font-bold">
                            GST @ 18% Calculated Separately
                        </span>
                    </div>

                    <div className="p-5 space-y-4">
                        {/* Optional DOI toggle */}
                        <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl flex items-center justify-between">
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="doiCheck"
                                    checked={data.includeDoi}
                                    onChange={(e) => onChange({ includeDoi: e.target.checked })}
                                    className="w-4 h-4 mt-0.5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="doiCheck" className="text-xs font-semibold cursor-pointer">
                                    <span className="font-extrabold text-slate-800 dark:text-slate-200 block">
                                        Opt for Crossref DOI Assignment ({formatINR(journal.doi)} + GST)
                                    </span>
                                    <span className="text-slate-500 text-[11px]">
                                        Assigns permanent, globally citable Digital Object Identifier (DOI) upon publication.
                                    </span>
                                </label>
                            </div>
                            <span className="text-xs font-extrabold text-blue-800 dark:text-blue-300">
                                {data.includeDoi ? "+ " + formatINR(journal.doi) : "Not Selected"}
                            </span>
                        </div>

                        {/* Fee Table */}
                        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold">
                                    <tr>
                                        <th className="p-3">Fee Component</th>
                                        <th className="p-3">Base</th>
                                        <th className="p-3">GST (18%)</th>
                                        <th className="p-3 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <tr>
                                        <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                                            Base APC (Lead Author)
                                        </td>
                                        <td className="p-3">{formatINR(fees.baseApc)}</td>
                                        <td className="p-3">{formatINR(fees.baseApc * 0.18)}</td>
                                        <td className="p-3 text-right font-bold">
                                            {formatINR(fees.baseApc * 1.18)}
                                        </td>
                                    </tr>

                                    {authorCount >= 2 && (
                                        <tr>
                                            <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                                                Additional Author Charge (2nd Author)
                                            </td>
                                            <td className="p-3">{formatINR(journal.second)}</td>
                                            <td className="p-3">{formatINR(journal.second * 0.18)}</td>
                                            <td className="p-3 text-right font-bold">
                                                {formatINR(journal.second * 1.18)}
                                            </td>
                                        </tr>
                                    )}

                                    {authorCount >= 3 && (
                                        <tr>
                                            <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                                                Additional Author Charge ({authorCount - 2} Co-Author{authorCount - 2 > 1 ? "s" : ""})
                                            </td>
                                            <td className="p-3">{formatINR((authorCount - 2) * journal.later)}</td>
                                            <td className="p-3">{formatINR((authorCount - 2) * journal.later * 0.18)}</td>
                                            <td className="p-3 text-right font-bold">
                                                {formatINR((authorCount - 2) * journal.later * 1.18)}
                                            </td>
                                        </tr>
                                    )}

                                    {data.includeDoi && (
                                        <tr>
                                            <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                                                Crossref DOI Registration
                                            </td>
                                            <td className="p-3">{formatINR(journal.doi)}</td>
                                            <td className="p-3">{formatINR(journal.doi * 0.18)}</td>
                                            <td className="p-3 text-right font-bold">
                                                {formatINR(journal.doi * 1.18)}
                                            </td>
                                        </tr>
                                    )}

                                    <tr className="bg-slate-50 dark:bg-slate-800/60 font-bold">
                                        <td className="p-3">Gross Subtotal &amp; Tax</td>
                                        <td className="p-3">{formatINR(fees.subtotal)}</td>
                                        <td className="p-3">{formatINR(fees.gstAmount)}</td>
                                        <td className="p-3 text-right font-extrabold text-slate-900 dark:text-white">
                                            {formatINR(fees.grossTotal)}
                                        </td>
                                    </tr>

                                    {fees.discountAmount > 0 && (
                                        <tr className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold">
                                            <td className="p-3 flex items-center gap-1.5">
                                                <Tag className="w-3.5 h-3.5" />
                                                <span>Waiver Discount ({data.appliedWaiverCode})</span>
                                            </td>
                                            <td colSpan={2} className="p-3 text-right">
                                                {data.waiverDiscountPercent ? `${data.waiverDiscountPercent}% Off` : "Institutional Grant"}
                                            </td>
                                            <td className="p-3 text-right font-extrabold text-emerald-800 dark:text-emerald-300">
                                                - {formatINR(fees.discountAmount)}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fee-Waiver / Referral Code Box */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border-2 border-blue-200 dark:border-blue-900 rounded-2xl p-5 shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h4 className="font-extrabold text-sm text-[#092d68] dark:text-blue-300 flex items-center gap-2">
                            <span>🏷️</span> Fee-Waiver / Referral / Exemption Code
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                            Have an authorized fee-waiver code, Univet discount, or editorial voucher? Apply it below.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            value={codeVal}
                            onChange={(e) => setCodeVal(e.target.value.toUpperCase())}
                            placeholder="e.g. UNIVET10, SCHOLAR50"
                            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs uppercase font-mono font-bold tracking-wider focus:ring-2 focus:ring-[#0755ad] focus:outline-none flex-1 md:w-56"
                        />
                        {data.appliedWaiverCode ? (
                            <button
                                type="button"
                                onClick={handleClearCode}
                                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-2 rounded-lg"
                            >
                                Remove
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => handleApplyCode()}
                                className="bg-[#092d68] hover:bg-[#001d51] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
                            >
                                Apply Code
                            </button>
                        )}
                    </div>
                </div>

                {codeStatus.type !== "none" && (
                    <div
                        className={`mt-3 p-2.5 rounded-lg text-xs font-bold flex items-center gap-2 ${
                            codeStatus.type === "success"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                        }`}
                    >
                        {codeStatus.type === "success" ? (
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                        ) : (
                            <AlertCircle className="w-4 h-4 shrink-0" />
                        )}
                        <span>{codeStatus.message}</span>
                    </div>
                )}
            </div>

            {/* Total Payable Banner */}
            <div className="bg-gradient-to-r from-[#092c6d] to-[#001b4e] text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <span className="text-xs uppercase tracking-wider text-blue-200 font-extrabold block">
                        Net Amount Payable
                    </span>
                    <span className="text-sm text-slate-300">
                        {fees.isFullyWaived ? "100% Fee Exemption Approved" : "Inclusive of all author charges and 18% GST"}
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-3xl md:text-4xl font-extrabold text-[#ffdf20] font-mono">
                        {formatINR(fees.netPayable)}
                    </span>
                </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Edit Submission
                </button>

                <button
                    type="button"
                    onClick={onNext}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#075dc0] to-[#001e65] text-white font-extrabold text-sm md:text-base rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                    Proceed to Payment &nbsp; <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
