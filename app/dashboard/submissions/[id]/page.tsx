// app/dashboard/submissions/[id]/page.tsx
import AuthorVerification from "../_components/AuthorVerification";
import FileManagement from "../_components/FileManagement";
import ReviewActions from "../_components/ReviewActions";
import SubmissionInfo from "../_components/SubmissionInfo";
import { getEditorForAssign, getSubmissionDetails } from "../action";

type Props = {
    params: Promise<{ id: string; }>
}

export default async function SubmissionDetailsPage({ params }: Props) {
    const { id } = await params;

    // Fetch data in parallel for performance
    const [submission, editorData] = await Promise.all([
        getSubmissionDetails(id),
        getEditorForAssign()
    ]);

    if (!submission.data) return <div className="p-20 text-center">Manuscript not found.</div>;

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        {submission.data.title}
                    </h1>
                    <p className="text-muted-foreground mt-1 font-medium">
                        Manuscript ID: <span className="text-primary">{id}</span> • Initial Manager Screening
                    </p>
                </div>

                {/* 
                   Simplified component: We only pass the required data.
                   Internal state (popup) is handled by the client.
                */}
                <ReviewActions
                    submission={submission.data}
                    editors={editorData.data || []}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <SubmissionInfo data={submission.data} />
                    <FileManagement files={submission.data.files} />
                </div>

                <div className="space-y-8">
                    <AuthorVerification author={submission.data.author} />

                    {/* Compliance Reminder for the Manager */}
                    <div className="p-4 bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 rounded-2xl">
                        <h4 className="text-xs font-bold text-[#1E3A8A] uppercase mb-2">Manager Note</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                            Approving this manuscript will move it to the **Under Review** stage.
                            You must assign a Handling Editor from the Editorial Board to oversee the
                            blind review process.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}