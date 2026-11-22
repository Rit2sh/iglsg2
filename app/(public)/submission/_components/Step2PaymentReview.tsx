"use client";

import React, { useState } from "react";
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
        message: data.waiverLabel ? `Applied: ${data.waiverLabel}` : "",
    });

    const journal = JOURNALS[data.journalId] || JOURNALS.j1;
    const authorCount = data.authors.length;

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
                message: "Enter an authorized fee-waiver or referral code.",
            });
            return;
        }

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
                    message: `${resData.label || "Fee exemption"} applied successfully.`,
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
                    message: resData.message || "Invalid or expired fee-waiver code.",
                });
            }
        } catch {
            setCodeStatus({
                type: "error",
                message: "Unable to validate code at this time.",
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
            <div className="bg-[#061a43] text-white rounded-lg px-6 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-bold tracking-tight">
                        Step 2: Payment Details (Review of Amount)
                    </h2>
                    <p className="text-xs text-slate-300">
                        Review your submission parameters, applicable Article Processing Charges, and optional exemptions.
                    </p>
                </div>
                <span className="text-xs font-mono font-semibold bg-white/10 text-white px-2.5 py-1 rounded">
                    {data.manuscriptId}
                </span>
            </div>

            {/* Top Grid: Submission Summary & Fee Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Card: Submission Summary */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col justify-between">
                    <div>
                        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                Submission Summary
                            </h3>
                        </div>
                        <div className="p-6 space-y-3 text-xs">
                            <div className="flex justify-between items-start pb-2 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 font-semibold">Manuscript ID:</span>
                                <span className="font-mono font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                                    {data.manuscriptId}
                                </span>
                            </div>
                            <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 font-semibold block mb-0.5">Journal:</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                                    {journal.name}
                                </span>
                            </div>
                            <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 font-semibold block mb-0.5">Title:</span>
                                <p className="font-medium text-slate-700 dark:text-slate-300">
                                    {data.title || "Untitled Manuscript"}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <span className="text-slate-500 font-semibold block mb-0.5">Category:</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {data.category}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500 font-semibold block mb-0.5">Author Count:</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {authorCount} Author{authorCount > 1 ? "s" : ""}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="text-slate-500 font-semibold block mb-0.5">Corresponding Author:</span>
                                <p className="font-bold text-slate-800 dark:text-slate-200">{data.authors[0]?.name}</p>
                                <p className="text-slate-500 text-[11px]">{data.correspondingEmail}</p>
                                <p className="text-slate-500 text-[11px]">{data.correspondingMobile}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                        To amend manuscript details or author affiliations, select &ldquo;Edit Submission&rdquo; below.
                    </div>
                </div>

                {/* Right Card: Fee Breakdown Table & Options */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            Article Processing Charges (APC)
                        </h3>
                        <span className="text-xs text-slate-500">
                            GST @ 18% Calculated Separately
                        </span>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Optional DOI toggle */}
                        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md flex items-center justify-between">
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="doiCheck"
                                    checked={data.includeDoi}
                                    onChange={(e) => onChange({ includeDoi: e.target.checked })}
                                    className="w-4 h-4 mt-0.5 text-[#061a43] rounded"
                                />
                                <label htmlFor="doiCheck" className="text-xs cursor-pointer">
                                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                                        Crossref DOI Assignment ({formatINR(journal.doi)} + GST)
                                    </span>
                                    <span className="text-slate-500">
                                        Registers a permanent citable Digital Object Identifier upon publication.
                                    </span>
                                </label>
                            </div>
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                {data.includeDoi ? "+ " + formatINR(journal.doi) : "Not Selected"}
                            </span>
                        </div>

                        {/* Fee Table */}
                        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-md">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                                    <tr>
                                        <th className="p-3">Fee Component</th>
                                        <th className="p-3">Base</th>
                                        <th className="p-3">GST (18%)</th>
                                        <th className="p-3 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <tr>
                                        <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                                            Base APC (Lead Author)
                                        </td>
                                        <td className="p-3">{formatINR(fees.baseApc)}</td>
                                        <td className="p-3">{formatINR(fees.baseApc * 0.18)}</td>
                                        <td className="p-3 text-right font-semibold">
                                            {formatINR(fees.baseApc * 1.18)}
                                        </td>
                                    </tr>

                                    {authorCount >= 2 && (
                                        <tr>
                                            <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                                                Additional Author Charge (2nd Author)
                                            </td>
                                            <td className="p-3">{formatINR(journal.second)}</td>
                                            <td className="p-3">{formatINR(journal.second * 0.18)}</td>
                                            <td className="p-3 text-right font-semibold">
                                                {formatINR(journal.second * 1.18)}
                                            </td>
                                        </tr>
                                    )}

                                    {authorCount >= 3 && (
                                        <tr>
                                            <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                                                Additional Author Charge ({authorCount - 2} Co-Author{authorCount - 2 > 1 ? "s" : ""})
                                            </td>
                                            <td className="p-3">{formatINR((authorCount - 2) * journal.later)}</td>
                                            <td className="p-3">{formatINR((authorCount - 2) * journal.later * 0.18)}</td>
                                            <td className="p-3 text-right font-semibold">
                                                {formatINR((authorCount - 2) * journal.later * 1.18)}
                                            </td>
                                        </tr>
                                    )}

                                    {data.includeDoi && (
                                        <tr>
                                            <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                                                Crossref DOI Registration
                                            </td>
                                            <td className="p-3">{formatINR(journal.doi)}</td>
                                            <td className="p-3">{formatINR(journal.doi * 0.18)}</td>
                                            <td className="p-3 text-right font-semibold">
                                                {formatINR(journal.doi * 1.18)}
                                            </td>
                                        </tr>
                                    )}

                                    <tr className="bg-slate-50 dark:bg-slate-800/60 font-semibold">
                                        <td className="p-3">Gross Subtotal &amp; Tax</td>
                                        <td className="p-3">{formatINR(fees.subtotal)}</td>
                                        <td className="p-3">{formatINR(fees.gstAmount)}</td>
                                        <td className="p-3 text-right text-slate-900 dark:text-white font-bold">
                                            {formatINR(fees.grossTotal)}
                                        </td>
                                    </tr>

                                    {fees.discountAmount > 0 && (
                                        <tr className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-medium">
                                            <td className="p-3">
                                                Waiver / Exemption ({data.appliedWaiverCode})
                                            </td>
                                            <td colSpan={2} className="p-3 text-right">
                                                {data.waiverDiscountPercent ? `${data.waiverDiscountPercent}% Discount` : "Institutional Grant"}
                                            </td>
                                            <td className="p-3 text-right font-bold text-emerald-800 dark:text-emerald-300">
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
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                            Fee-Waiver / Referral Code
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Enter an institutional exemption code, partner voucher, or editorial fee waiver.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            value={codeVal}
                            onChange={(e) => setCodeVal(e.target.value.toUpperCase())}
                            placeholder="e.g. UNIVET10, SCHOLAR50"
                            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-xs uppercase font-mono font-semibold tracking-wider focus:border-[#061a43] focus:outline-none flex-1 md:w-56"
                        />
                        {data.appliedWaiverCode ? (
                            <button
                                type="button"
                                onClick={handleClearCode}
                                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3 py-2 rounded"
                            >
                                Remove
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => handleApplyCode()}
                                className="bg-[#061a43] hover:bg-[#00245d] text-white text-xs font-semibold px-4 py-2 rounded"
                            >
                                Apply Code
                            </button>
                        )}
                    </div>
                </div>

                {codeStatus.type !== "none" && (
                    <div
                        className={`mt-3 p-2.5 rounded text-xs font-medium ${
                            codeStatus.type === "success"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                                : "bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800"
                        }`}
                    >
                        {codeStatus.message}
                    </div>
                )}
            </div>

            {/* Total Payable Banner */}
            <div className="bg-[#061a43] text-white rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold block">
                        Net Amount Payable
                    </span>
                    <span className="text-xs text-slate-400">
                        {fees.isFullyWaived ? "100% Fee Exemption Approved" : "All author processing charges & 18% GST included"}
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-2xl md:text-3xl font-bold font-mono text-[#ffe66b]">
                        {formatINR(fees.netPayable)}
                    </span>
                </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50"
                >
                    &larr; Edit Submission
                </button>

                <button
                    type="button"
                    onClick={onNext}
                    className="w-full sm:w-auto px-7 py-3 bg-[#061a43] hover:bg-[#00245d] text-white font-bold text-sm rounded-md shadow-sm"
                >
                    Proceed to Payment &rarr;
                </button>
            </div>
        </div>
    );
}
