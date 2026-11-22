"use client";

import React, { useState, useEffect } from "react";
import WizardProgress from "./WizardProgress";
import Step1ManuscriptUpload from "./Step1ManuscriptUpload";
import Step2PaymentReview from "./Step2PaymentReview";
import Step3PaymentFinalSubmission from "./Step3PaymentFinalSubmission";
import { SubmissionFormData } from "@/lib/submission/types";
import { generateManuscriptId } from "@/lib/submission/journals";

const INITIAL_FORM_DATA: SubmissionFormData = {
    journalId: "j1",
    category: "Research Article",
    title: "",
    abstract: "",
    keywords: [],
    researchTheme: "Constitutional Law",
    authors: [
        {
            id: "lead-author-1",
            order: 1,
            name: "",
            email: "",
            designation: "Assistant Professor",
            affiliation: "",
            country: "India",
            isCorresponding: true,
        },
    ],
    correspondingEmail: "",
    correspondingMobile: "",
    manuscriptId: "",
    includeDoi: true,
    paymentMethod: "upi",
    declarationAccepted: false,
};

export default function SubmissionWizard() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [formData, setFormData] = useState<SubmissionFormData>(INITIAL_FORM_DATA);

    useEffect(() => {
        // Load draft from localStorage or initialize manuscript ID
        const saved = localStorage.getItem("ijlsg_submission_draft");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setFormData((prev) => ({
                    ...prev,
                    ...parsed,
                    manuscriptId: parsed.manuscriptId || generateManuscriptId("AXJ"),
                }));
            } catch {
                setFormData((prev) => ({ ...prev, manuscriptId: generateManuscriptId("AXJ") }));
            }
        } else {
            setFormData((prev) => ({ ...prev, manuscriptId: generateManuscriptId("AXJ") }));
        }
    }, []);

    const handleChange = (updates: Partial<SubmissionFormData>) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    };

    const handleStep1Complete = () => {
        if (!completedSteps.includes(1)) {
            setCompletedSteps((prev) => [...prev, 1]);
        }
        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleStep2Complete = () => {
        if (!completedSteps.includes(2)) {
            setCompletedSteps((prev) => [...prev, 2]);
        }
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFinish = ({ manuscriptId }: { success: boolean; manuscriptId: string }) => {
        setCompletedSteps([1, 2, 3]);
        localStorage.removeItem("ijlsg_submission_draft");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header Hero */}
            <div className="text-center space-y-1 pt-2 pb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0755ad] bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
                    Axiara Journals Wing &bull; Central Submission Portal
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#061a43] dark:text-white tracking-tight">
                    Manuscript Submission &amp; Payment Portal
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm max-w-xl mx-auto">
                    Submit your research manuscript for peer-review, review transparent publication charges, and finalize your submission.
                </p>
            </div>

            {/* Step Indicator */}
            <WizardProgress
                currentStep={step}
                onStepClick={(s) => setStep(s)}
                completedSteps={completedSteps}
            />

            {/* Active Step Content */}
            {step === 1 && (
                <Step1ManuscriptUpload
                    data={formData}
                    onChange={handleChange}
                    onNext={handleStep1Complete}
                />
            )}

            {step === 2 && (
                <Step2PaymentReview
                    data={formData}
                    onChange={handleChange}
                    onNext={handleStep2Complete}
                    onBack={() => {
                        setStep(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                />
            )}

            {step === 3 && (
                <Step3PaymentFinalSubmission
                    data={formData}
                    onChange={handleChange}
                    onBack={() => {
                        setStep(2);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    onFinish={handleFinish}
                />
            )}
        </div>
    );
}
