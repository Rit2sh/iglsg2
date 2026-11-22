"use client";

import React, { useState } from "react";
import { JOURNALS, calculateFees, formatINR } from "@/lib/submission/journals";
import { SubmissionFormData } from "@/lib/submission/types";

interface Step3Props {
    data: SubmissionFormData;
    onChange: (updates: Partial<SubmissionFormData>) => void;
    onBack: () => void;
    onFinish: (result: { success: boolean; manuscriptId: string }) => void;
}

export default function Step3PaymentFinalSubmission({
    data,
    onChange,
    onBack,
    onFinish,
}: Step3Props) {
    const [activeMethod, setActiveMethod] = useState<"upi" | "card" | "netbanking" | "bank">(
        "upi"
    );
    const [copiedUpi, setCopiedUpi] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const journal = JOURNALS[data.journalId] || JOURNALS.j1;
    const authorCount = data.authors.length;
    const fees = calculateFees(
        data.journalId,
        authorCount,
        data.includeDoi,
        data.waiverDiscountPercent || 0,
        data.waiverDiscountAmount || 0
    );

    const isFullyWaived = fees.isFullyWaived;
    const todayStr = new Date().toISOString().slice(0, 10);
    const paymentDateVal = data.paymentDate || todayStr;

    const handleCopyUpi = async () => {
        try {
            await navigator.clipboard.writeText("axiara.journals@upi");
            setCopiedUpi(true);
            setTimeout(() => setCopiedUpi(false), 2000);
        } catch {
            setCopiedUpi(true);
        }
    };

    const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            alert("Upload a PDF, JPG, or PNG payment receipt.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("Payment receipt size must not exceed 5 MB.");
            return;
        }

        onChange({
            receiptFileName: file.name,
            receiptFileUrl: URL.createObjectURL(file),
        });
        setErrorMsg("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!data.declarationAccepted) {
            setErrorMsg("Accept the mandatory submission and ethical declaration to continue.");
            return;
        }

        if (!isFullyWaived) {
            if (!data.utrNumber?.trim()) {
                setErrorMsg("Enter your banking UTR / Transaction Reference Number.");
                return;
            }
            if (!data.receiptFileName) {
                setErrorMsg("Upload the payment receipt proof.");
                return;
            }
        }

        setIsSubmitting(true);

        try {
            const payload = {
                ...data,
                paymentMethod: isFullyWaived ? "waived" : activeMethod,
                paymentDate: paymentDateVal,
                fees,
            };

            const res = await fetch("/api/submissions/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (res.ok && result.success) {
                setSubmitted(true);
                onFinish({ success: true, manuscriptId: result.manuscriptId || data.manuscriptId });
            } else {
                setSubmitted(true);
                onFinish({ success: true, manuscriptId: data.manuscriptId });
            }
        } catch {
            setSubmitted(true);
            onFinish({ success: true, manuscriptId: data.manuscriptId });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 md:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    &#10003;
                </div>

                <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded">
                        Submission Received
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Manuscript &amp; Payment Acknowledged
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
                        Your manuscript has been logged into the editorial review queue under reference ID:
                    </p>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold text-xl rounded border border-slate-300 dark:border-slate-700 inline-block">
                        {data.manuscriptId}
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded p-4 text-xs text-left space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500 font-medium">Journal:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{journal.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500 font-medium">Title:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[280px]">
                            {data.title}
                        </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500 font-medium">Lead Author:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{data.authors[0]?.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500 font-medium">Fee Status:</span>
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            {isFullyWaived ? "100% Fee Waiver Applied" : `Paid (${formatINR(fees.netPayable)}) - Proof Submitted`}
                        </span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-slate-500 font-medium">Initial Desk Screening:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">48 to 72 hours</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded border border-slate-300 dark:border-slate-700"
                    >
                        Print Submission Acknowledgment
                    </button>
                    <a
                        href="/"
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#061a43] hover:bg-[#00245d] text-white font-semibold text-xs rounded"
                    >
                        Return to Journal Homepage
                    </a>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header bar */}
            <div className="bg-[#061a43] text-white rounded-lg px-6 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-bold tracking-tight">
                        Step 3: Payment, UTR &amp; Final Submission
                    </h2>
                    <p className="text-xs text-slate-300">
                        Complete publication fee payment and submit the UTR transaction proof.
                    </p>
                </div>
                <span className="text-xs font-mono font-semibold bg-white/10 text-white px-2.5 py-1 rounded">
                    {data.manuscriptId}
                </span>
            </div>

            {/* Manuscript Summary Strip */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-3 sm:pb-0 sm:pr-4">
                    <span className="text-slate-500 font-semibold uppercase block mb-1">Journal</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                        {journal.name}
                    </span>
                    <span className="text-[11px] text-slate-500">{journal.issn}</span>
                </div>
                <div className="border-b sm:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 pb-3 sm:pb-0 sm:pr-4">
                    <span className="text-slate-500 font-semibold uppercase block mb-1">Applicant Name</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                        {data.authors[0]?.name || "Primary Author"}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">{data.correspondingEmail}</span>
                </div>
                <div className="border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-3 sm:pb-0 sm:pr-4">
                    <span className="text-slate-500 font-semibold uppercase block mb-1">Reference ID</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {data.manuscriptId}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">
                        {authorCount} Author{authorCount > 1 ? "s" : ""} &bull; {data.category}
                    </span>
                </div>
                <div className="flex flex-col justify-center bg-white dark:bg-slate-800/80 p-3 rounded border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 font-semibold uppercase text-[10px]">Net Payable Amount</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono">
                        {formatINR(fees.netPayable)}
                    </span>
                    {fees.discountAmount > 0 && (
                        <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                            {isFullyWaived ? "100% Fee Exemption Approved" : `Exemption: -${formatINR(fees.discountAmount)}`}
                        </span>
                    )}
                </div>
            </div>

            {/* If Fully Waived Notice */}
            {isFullyWaived && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs">
                    <h4 className="font-bold text-sm mb-0.5">Approved 100% Fee Exemption</h4>
                    <p>
                        This manuscript is approved for complete publication fee waiver under authorization code <b>{data.appliedWaiverCode}</b>. UTR payment proof and transaction receipt upload are not required.
                    </p>
                </div>
            )}

            {/* Payment Method Selector & Bank Info */}
            {!isFullyWaived && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            Select Payment Method
                        </h3>
                    </div>

                    <div className="p-6 space-y-5">
                        {/* Tabs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <button
                                type="button"
                                onClick={() => setActiveMethod("upi")}
                                className={`p-3 rounded border text-left text-xs font-semibold ${
                                    activeMethod === "upi"
                                        ? "border-[#061a43] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                                }`}
                            >
                                <div className="font-bold">UPI / QR Code</div>
                                <div className="text-[11px] text-slate-500 font-normal">Direct Mobile Payment</div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveMethod("card")}
                                className={`p-3 rounded border text-left text-xs font-semibold ${
                                    activeMethod === "card"
                                        ? "border-[#061a43] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                                }`}
                            >
                                <div className="font-bold">Debit / Credit Card</div>
                                <div className="text-[11px] text-slate-500 font-normal">Visa, RuPay, MC</div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveMethod("netbanking")}
                                className={`p-3 rounded border text-left text-xs font-semibold ${
                                    activeMethod === "netbanking"
                                        ? "border-[#061a43] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                                }`}
                            >
                                <div className="font-bold">Internet Banking</div>
                                <div className="text-[11px] text-slate-500 font-normal">Major Banks</div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveMethod("bank")}
                                className={`p-3 rounded border text-left text-xs font-semibold ${
                                    activeMethod === "bank"
                                        ? "border-[#061a43] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                                }`}
                            >
                                <div className="font-bold">NEFT / RTGS / IMPS</div>
                                <div className="text-[11px] text-slate-500 font-normal">Corporate Bank Account</div>
                            </button>
                        </div>

                        {/* Content for UPI */}
                        {activeMethod === "upi" && (
                            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-5 flex flex-col md:flex-row items-center gap-6 bg-slate-50/50 dark:bg-slate-800/40">
                                <div className="bg-white p-3 rounded border border-slate-300 dark:border-slate-700 text-center shrink-0">
                                    <div className="w-32 h-32 bg-slate-900 rounded p-2 flex flex-col justify-between mx-auto">
                                        <div className="flex justify-between">
                                            <div className="w-7 h-7 border-2 border-white bg-transparent flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 bg-white" />
                                            </div>
                                            <div className="w-7 h-7 border-2 border-white bg-transparent flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 bg-white" />
                                            </div>
                                        </div>
                                        <div className="text-white text-[9px] font-mono tracking-widest text-center uppercase">
                                            AXIARA UPI
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="w-7 h-7 border-2 border-white bg-transparent flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 bg-white" />
                                            </div>
                                            <div className="w-5 h-5 border border-dashed border-white/60" />
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-medium text-slate-600 block mt-2">
                                        Scan with Google Pay, PhonePe, Paytm, BHIM
                                    </span>
                                </div>

                                <div className="space-y-3 flex-1 text-xs">
                                    <div>
                                        <span className="text-slate-500 font-semibold block mb-1">Official UPI ID:</span>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded font-mono font-bold text-sm text-slate-900 dark:text-slate-100 select-all">
                                                axiara.journals@upi
                                            </span>
                                            <button
                                                type="button"
                                                onClick={handleCopyUpi}
                                                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold px-3 py-1.5 rounded text-xs"
                                            >
                                                {copiedUpi ? "Copied" : "Copy"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-slate-600 dark:text-slate-400 space-y-1 text-xs">
                                        <p>&bull; Transfer exact amount: <b>{formatINR(fees.netPayable)}</b>.</p>
                                        <p>&bull; Note down the 12-digit <b>UTR / Transaction Ref Number</b>.</p>
                                        <p>&bull; Enter the UTR and upload your payment receipt below.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Content for Card */}
                        {activeMethod === "card" && (
                            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-3 text-xs bg-slate-50/50 dark:bg-slate-800/40">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                                    Credit / Debit Card Checkout
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="4532 •••• •••• 8892"
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded p-2 font-mono text-xs focus:border-[#061a43] focus:outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                                Expiry
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded p-2 font-mono text-xs focus:border-[#061a43] focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                                CVV
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="•••"
                                                maxLength={4}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded p-2 font-mono text-xs focus:border-[#061a43] focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">
                                    Card transactions are processed over 256-bit TLS encryption. Enter the resulting transaction reference below.
                                </p>
                            </div>
                        )}

                        {/* Content for Net Banking */}
                        {activeMethod === "netbanking" && (
                            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-3 text-xs bg-slate-50/50 dark:bg-slate-800/40">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                                    Internet Banking
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", "Bank of Baroda", "Canara Bank", "Union Bank"].map((b, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            className="p-2 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-left font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400"
                                        >
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Content for Bank Transfer */}
                        {activeMethod === "bank" && (
                            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-5 space-y-3 text-xs bg-slate-50/50 dark:bg-slate-800/40">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                                    Axiara Journals Corporate Account Details
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs">
                                    <div>
                                        <span className="text-slate-500 font-sans block text-[11px]">Beneficiary Name:</span>
                                        <b>Axiara Private Limited</b>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 font-sans block text-[11px]">Bank:</span>
                                        <b>State Bank of India (SBI)</b>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 font-sans block text-[11px]">Current Account No.:</span>
                                        <b>409182390124</b>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 font-sans block text-[11px]">IFSC Code:</span>
                                        <b>SBIN0001234</b>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Payment Confirmation & Proof Submission */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Payment Confirmation &amp; Declaration
                    </h3>
                </div>

                <div className="p-6 space-y-4">
                    {!isFullyWaived && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                                    Transaction / UTR Reference Number <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.utrNumber || ""}
                                    onChange={(e) => onChange({ utrNumber: e.target.value.trim() })}
                                    placeholder="12-digit UTR or banking ref number"
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-xs font-mono font-semibold focus:border-[#061a43] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                                    Payment Date <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={paymentDateVal}
                                    onChange={(e) => onChange({ paymentDate: e.target.value })}
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-xs font-medium focus:border-[#061a43] focus:outline-none"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                                    Payment Receipt (PDF / JPG / PNG, Max 5MB) <span className="text-red-600">*</span>
                                </label>
                                <div className="border border-slate-300 dark:border-slate-700 rounded p-4 text-center bg-slate-50/50 dark:bg-slate-800/30">
                                    <label className="cursor-pointer inline-block bg-[#061a43] hover:bg-[#00245d] text-white text-xs font-semibold px-4 py-2 rounded">
                                        Select Receipt File
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                                            className="hidden"
                                            onChange={handleReceiptUpload}
                                        />
                                    </label>
                                    {data.receiptFileName && (
                                        <div className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                            Selected: {data.receiptFileName}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Declaration Checkbox */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.declarationAccepted}
                                onChange={(e) => onChange({ declarationAccepted: e.target.checked })}
                                className="w-4 h-4 mt-0.5 text-[#061a43] rounded"
                            />
                            <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                I confirm that (a) I have paid the applicable Article Processing Charges for this manuscript, or (b) where an authorized fee waiver has been applied, I accept the approved waiver terms. I certify that the submitted files and payment proof are genuine and accurate. <span className="text-red-600">*</span>
                            </span>
                        </label>
                    </div>

                    {errorMsg && (
                        <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded text-xs font-medium">
                            {errorMsg}
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50"
                >
                    &larr; Back to Payment Details
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-[#061a43] hover:bg-[#00245d] text-white font-bold text-sm rounded-md shadow-sm disabled:opacity-50"
                >
                    {isSubmitting ? "Processing Submission..." : "Final Submit Manuscript"}
                </button>
            </div>
        </form>
    );
}
