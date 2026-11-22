import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            manuscriptId,
            journalId,
            title,
            category,
            abstract,
            keywords,
            authors,
            correspondingEmail,
            correspondingMobile,
            fees,
            paymentMethod,
            utrNumber,
            paymentDate,
            receiptFileName,
            appliedWaiverCode,
        } = body;

        console.log(`[Submission Received] Manuscript ID: ${manuscriptId}, Journal: ${journalId}, Title: ${title}`);
        console.log(`[Payment] Method: ${paymentMethod}, UTR: ${utrNumber || "N/A"}, Fee: ${fees?.netPayable}`);

        // If Resend API Key is configured, attempt sending confirmation email
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey && correspondingEmail) {
            try {
                const emailHtml = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #c8def8; border-radius: 12px; background: #fdfefe;">
                        <div style="background: #061a43; padding: 15px 20px; border-radius: 8px; color: #fff;">
                            <h2 style="margin: 0; color: #ffd329;">AXIARA® JOURNALS WING</h2>
                            <p style="margin: 4px 0 0; font-size: 13px; color: #c8def8;">Manuscript Submission & Payment Acknowledgment</p>
                        </div>
                        <div style="padding: 20px 0;">
                            <p>Dear Author,</p>
                            <p>Thank you for submitting your research article to <b>Axiara Journals</b>. Your submission has been registered with the following details:</p>
                            
                            <table style="width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 13px;">
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px; color: #64748b; font-weight: bold;">Manuscript Reference ID:</td>
                                    <td style="padding: 8px; font-weight: bold; color: #0b246c;">${manuscriptId}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px; color: #64748b; font-weight: bold;">Title:</td>
                                    <td style="padding: 8px; font-weight: bold;">${title}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px; color: #64748b; font-weight: bold;">Payment Method:</td>
                                    <td style="padding: 8px;">${paymentMethod.toUpperCase()} ${utrNumber ? `(UTR: ${utrNumber})` : ""}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px; color: #64748b; font-weight: bold;">Net Fee Status:</td>
                                    <td style="padding: 8px; color: #059669; font-weight: bold;">₹ ${(fees?.netPayable || 0).toLocaleString("en-IN")} ${appliedWaiverCode ? `(Waiver: ${appliedWaiverCode})` : ""}</td>
                                </tr>
                            </table>

                            <p style="font-size: 13px; color: #475569;">
                                <b>Next Steps:</b> Your manuscript will undergo preliminary editorial desk review within 48–72 hours, followed by double-blind peer review. You will receive notifications on this email address.
                            </p>
                        </div>
                        <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; font-size: 11px; color: #94a3b8; text-align: center;">
                            Axiara Journals Wing &bull; An Imprint of Axiara Private Limited<br>
                            For inquiries: editorial@axiara.org &bull; http://localhost:3000
                        </div>
                    </div>
                `;

                // Resend free tier allows sending to the account owner (rajputanaritesh@gmail.com)
                // When a custom domain is verified on Resend, it can send to any author email directly
                const adminEmail = process.env.ADMIN_EMAIL || "rajputanaritesh@gmail.com";
                const recipients = correspondingEmail === adminEmail ? [adminEmail] : [correspondingEmail, adminEmail];

                const resendRes = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${resendApiKey}`,
                    },
                    body: JSON.stringify({
                        from: "IJLSG Journals <onboarding@resend.dev>",
                        to: [adminEmail],
                        reply_to: correspondingEmail,
                        subject: `[IJLSG] Manuscript Received: ${manuscriptId}`,
                        html: emailHtml,
                    }),
                });

                const resendData = await resendRes.json();
                console.log("[Resend Email Result]:", resendData);
            } catch (emailErr) {
                console.error("[Email Notice] Could not send confirmation email via Resend:", emailErr);
            }
        }

        return NextResponse.json({
            success: true,
            manuscriptId,
            message: "Manuscript and payment details successfully received.",
            timestamp: new Date().toISOString(),
        });
    } catch (err: any) {
        console.error("Submission API Error:", err);
        return NextResponse.json(
            { success: false, message: "Server error processing submission." },
            { status: 500 }
        );
    }
}

