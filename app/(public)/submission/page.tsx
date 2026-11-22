import type { Metadata } from "next";
import SubmissionWizard from "./_components/SubmissionWizard";

export const metadata: Metadata = {
    title: "Manuscript Submission & Payment Portal | Axiara Journals Wing",
    description: "Central manuscript submission, author affiliations, APC review, and payment portal for Axiara Journals.",
};

export default function SubmissionPage() {
    return (
        <main className="min-h-screen bg-[#f5f9ff] dark:bg-slate-950 py-10 px-4 md:px-8">
            <SubmissionWizard />
        </main>
    );
}
