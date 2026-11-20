import ArticleForm from "./_components/ArticleForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Submit Article",
    description: "Submit your article for review and publication.",
};


export default function SubmissionPage() {
    return (
        <main className="min-h-screen bg-muted/40 py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Submissions
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Submit Your Article
                    </h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Fill in the details below. Fields marked with an asterisk (
                        <span className="text-destructive">*</span>) are required. You can
                        attach a PDF or Word document alongside or instead of pasting the
                        full content.
                    </p>
                </div>

                <ArticleForm />
            </div>
        </main>
    );
}