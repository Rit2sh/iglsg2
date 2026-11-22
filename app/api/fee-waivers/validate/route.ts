import { NextRequest, NextResponse } from "next/server";
import { validateReferralCodeLocal, calculateFees } from "@/lib/submission/journals";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { code, journalId, includeDoi, authorCount, manuscriptId } = body;

        const check = validateReferralCodeLocal(code);
        if (!check.valid) {
            return NextResponse.json(
                { valid: false, message: check.message || "Invalid or unrecognized referral code." },
                { status: 400 }
            );
        }

        // Calculate theoretical waiver amount
        const fees = calculateFees(
            journalId || "j1",
            Number(authorCount) || 1,
            Boolean(includeDoi),
            check.percent || 0,
            0
        );

        return NextResponse.json({
            valid: true,
            code: check.code,
            percent: check.percent,
            waiverAmount: fees.discountAmount,
            label: check.label,
            message: check.message,
            manuscriptId,
        });
    } catch (err: any) {
        return NextResponse.json(
            { valid: false, message: "Error validating referral code." },
            { status: 500 }
        );
    }
}
