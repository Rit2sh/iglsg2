export interface JournalConfig {
    id: string;
    name: string;
    shortName: string;
    issn: string;
    base: number;
    second: number;
    later: number;
    doi: number;
    max: number;
    note: string;
    disciplines: string[];
}

export interface AuthorItem {
    id: string;
    order: number;
    name: string;
    email: string;
    designation: string;
    affiliation: string;
    country: string;
    isCorresponding: boolean;
}

export interface SubmissionFormData {
    // Step 1: Manuscript & Authors
    journalId: string;
    category: string;
    title: string;
    abstract: string;
    keywords: string[];
    researchTheme: string;
    authors: AuthorItem[];
    correspondingEmail: string;
    correspondingMobile: string;
    manuscriptFileName?: string;
    manuscriptFileSize?: number;
    manuscriptFileUrl?: string;
    supplementaryFileName?: string;
    supplementaryFileUrl?: string;

    // Step 2: Payment Details
    manuscriptId: string;
    includeDoi: boolean;
    appliedWaiverCode?: string;
    waiverDiscountPercent?: number;
    waiverDiscountAmount?: number;
    waiverLabel?: string;

    // Step 3: Payment Confirmation
    paymentMethod: "upi" | "card" | "netbanking" | "bank" | "waived";
    utrNumber?: string;
    paymentDate?: string;
    receiptFileName?: string;
    receiptFileUrl?: string;
    declarationAccepted: boolean;
}

export interface FeeCalculation {
    journalId: string;
    authorCount: number;
    includeDoi: boolean;
    baseApc: number;
    additionalAuthorFee: number;
    doiFee: number;
    subtotal: number;
    gstRate: number;
    gstAmount: number;
    grossTotal: number;
    discountAmount: number;
    netPayable: number;
    isFullyWaived: boolean;
}

export interface ReferralValidationResult {
    valid: boolean;
    code: string;
    percent?: number;
    waiverAmount?: number;
    label: string;
    message?: string;
}
