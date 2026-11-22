import { JournalConfig, FeeCalculation, ReferralValidationResult } from "./types";

export const JOURNALS: Record<string, JournalConfig> = {
    j1: {
        id: "j1",
        name: "International Journal of Law and Social Governance (IJLSG)",
        shortName: "IJLSG",
        issn: "2583-9993 (Online)",
        base: 1000,
        second: 200,
        later: 100,
        doi: 200,
        max: 6,
        note: "Journal 1: Base APC ₹1,000 (1st Author); 2nd author ₹200; 3rd–6th authors ₹100 each. Optional DOI ₹200. GST @ 18% applies.",
        disciplines: ["Constitutional Law", "Human Rights", "Environmental Governance", "Social Justice Jurisprudence", "Criminal Law"],
    },
    j2: {
        id: "j2",
        name: "Axiara Journal of Comparative Constitutional Law & Governance",
        shortName: "AJCCLG",
        issn: "2584-1205 (Online)",
        base: 1500,
        second: 500,
        later: 200,
        doi: 300,
        max: 6,
        note: "Journal 2: Base APC ₹1,500; 2nd author ₹500; 3rd–6th authors ₹200 each. Optional DOI ₹300. GST @ 18% applies.",
        disciplines: ["Comparative Public Law", "Administrative Governance", "Judicial Review", "Federalism"],
    },
    j3: {
        id: "j3",
        name: "Axiara Review of International Economic Law & Trade",
        shortName: "ARIELT",
        issn: "2584-3310 (Online)",
        base: 2500,
        second: 1000,
        later: 0,
        doi: 800,
        max: 2,
        note: "Journal 3: Base APC ₹2,500; 2nd author ₹1,000; maximum 2 authors permitted. Optional DOI ₹800. GST @ 18% applies.",
        disciplines: ["International Trade Law", "WTO Jurisprudence", "Investment Arbitration", "Commercial Governance"],
    },
};

export const GST_RATE = 0.18;

export function formatINR(amount: number): string {
    return "₹ " + Number(amount || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function generateManuscriptId(prefix = "AXJ"): string {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${year}-${random}`;
}

export function calculateFees(
    journalId: string,
    authorCount: number,
    includeDoi: boolean,
    waiverPercent = 0,
    waiverFlatAmount = 0
): FeeCalculation {
    const journal = JOURNALS[journalId] || JOURNALS.j1;
    const count = Math.max(1, authorCount);

    const baseApc = journal.base;
    let additionalAuthorFee = 0;

    if (count >= 2) {
        additionalAuthorFee += journal.second;
    }
    if (count >= 3) {
        const extraAuthors = Math.min(count, journal.max) - 2;
        additionalAuthorFee += extraAuthors * journal.later;
    }

    const doiFee = includeDoi ? journal.doi : 0;
    const subtotal = baseApc + additionalAuthorFee + doiFee;
    const gstAmount = Math.round(subtotal * GST_RATE * 100) / 100;
    const grossTotal = subtotal + gstAmount;

    let discountAmount = 0;
    if (waiverPercent > 0) {
        discountAmount = Math.round((grossTotal * (waiverPercent / 100)) * 100) / 100;
    } else if (waiverFlatAmount > 0) {
        discountAmount = Math.min(grossTotal, waiverFlatAmount);
    }

    const netPayable = Math.max(0, Math.round((grossTotal - discountAmount) * 100) / 100);
    const isFullyWaived = netPayable === 0;

    return {
        journalId,
        authorCount: count,
        includeDoi,
        baseApc,
        additionalAuthorFee,
        doiFee,
        subtotal,
        gstRate: GST_RATE,
        gstAmount,
        grossTotal,
        discountAmount,
        netPayable,
        isFullyWaived,
    };
}

export const KNOWN_REFERRAL_CODES: Record<string, { percent: number; label: string }> = {
    univet10: { percent: 10, label: "Univet Research Partner 10% Discount" },
    axiara20: { percent: 20, label: "Axiara Academic Network 20% Discount" },
    scholar50: { percent: 50, label: "Young Legal Scholars 50% Research Subsidy" },
    fullwaiver100: { percent: 100, label: "100% Institutional Open-Access Fee Waiver" },
    editorial100: { percent: 100, label: "Editorial Board Invited Manuscript (100% Waived)" },
};

export function validateReferralCodeLocal(code: string): ReferralValidationResult {
    const clean = (code || "").trim().toLowerCase();
    if (!clean) {
        return {
            valid: false,
            code,
            label: "",
            message: "Please enter a valid fee-waiver or referral code.",
        };
    }

    const found = KNOWN_REFERRAL_CODES[clean];
    if (found) {
        return {
            valid: true,
            code: clean.toUpperCase(),
            percent: found.percent,
            label: found.label,
            message: `✓ ${found.label} successfully applied (${found.percent}% fee deduction).`,
        };
    }

    return {
        valid: false,
        code,
        label: "",
        message: "Invalid, expired, or unrecognized referral/waiver code.",
    };
}

