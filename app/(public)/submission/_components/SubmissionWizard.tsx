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

    const handleFinish = () => {
        setCompletedSteps([1, 2, 3]);
        localStorage.removeItem("ijlsg_submission_draft");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header Hero */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    Manuscript Submission &amp; Payment Portal
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Submit research manuscripts for peer-review, review Article Processing Charges, and record payment confirmation.
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
