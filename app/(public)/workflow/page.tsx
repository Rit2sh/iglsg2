import {
    FileText,
    CheckCircle,
    Edit,
    Users,
    Send,
    PenTool,
    Crown,
    Upload,
} from "lucide-react";

export default function WorkflowPage() {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">



            {/* HERO */}
            <section className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Editorial Workflow
                </h1>
                <p className="text-blue-100 text-lg">
                    A structured and transparent publishing process from submission to publication
                </p>
            </section>

            {/* FLOW STEPS */}
            <section className="max-w-6xl mx-auto px-6 py-12 space-y-10">

                <WorkflowStep
                    icon={<Upload />}
                    title="1. Article Submission"
                    role="Author"
                    desc="Authors submit their manuscripts along with metadata, abstract, and required documents through the submission system."
                />

                <WorkflowStep
                    icon={<CheckCircle />}
                    title="2. Initial Review"
                    role="Manager"
                    desc="The manager evaluates the submission for basic quality, formatting, and relevance before forwarding it."
                />

                <WorkflowStep
                    icon={<Edit />}
                    title="3. Editorial Review"
                    role="Editor"
                    desc="Editors review the manuscript, provide feedback, and refine the content for clarity and academic quality."
                />

                <WorkflowStep
                    icon={<Users />}
                    title="4. Pre-Review Process"
                    role="Reviewer"
                    desc="External reviewers assess the article critically, suggest improvements, and ensure research validity."
                />

                <WorkflowStep
                    icon={<Send />}
                    title="5. Secondary Review"
                    role="Manager"
                    desc="The manager reassesses the article after review feedback and prepares it for drafting."
                />

                <WorkflowStep
                    icon={<PenTool />}
                    title="6. Drafting & Formatting"
                    role="Drafter"
                    desc="The drafter prepares the final formatted version of the article ready for publication."
                />

                <WorkflowStep
                    icon={<Crown />}
                    title="7. Final Approval"
                    role="Editor-in-Chief / Editorial Director"
                    desc="Senior editorial leadership reviews and approves the article for final publication."
                />

                <WorkflowStep
                    icon={<FileText />}
                    title="8. Publication"
                    role="Manager"
                    desc="The approved article is officially published and made accessible to the global audience."
                />

            </section>

            {/* VISUAL FLOW */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border text-center">

                    <h2 className="text-2xl font-semibold mb-6">
                        Workflow Overview
                    </h2>

                    <div className="flex flex-wrap justify-center gap-3 text-sm">

                        {[
                            "Submission",
                            "Manager Review",
                            "Editor Review",
                            "Pre-Review",
                            "Manager Review",
                            "Drafting",
                            "Final Approval",
                            "Publish",
                        ].map((step) => (
                            <span
                                key={step}
                                className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                                {step}
                            </span>
                        ))}

                    </div>

                </div>
            </section>

            {/* BENEFITS */}
            <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">

                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Why This Workflow Matters
                    </h2>

                    <ul className="list-disc ml-5 text-sm space-y-2 text-slate-600 dark:text-slate-300">
                        <li>Ensures high-quality academic publishing</li>
                        <li>Maintains transparency in editorial decisions</li>
                        <li>Reduces errors through multi-level review</li>
                        <li>Improves collaboration among stakeholders</li>
                        <li>Speeds up the publication process</li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border">
                    <h3 className="font-semibold mb-3">Key Highlights</h3>

                    <ul className="space-y-2 text-sm">
                        <li>✔ Multi-stage validation</li>
                        <li>✔ Role-based responsibilities</li>
                        <li>✔ Secure review system</li>
                        <li>✔ Disposable review links</li>
                        <li>✔ Audit trail & tracking</li>
                    </ul>
                </div>

            </section>

            {/* CTA */}
            <section className="bg-blue-900 text-white py-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    Ready to Submit Your Research?
                </h2>
                <p className="text-blue-100 mb-6">
                    Experience a streamlined editorial workflow designed for academic excellence
                </p>

                <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold">
                    Submit Article
                </button>
            </section>


        </div>
    );
}

/////////////////////////////////////////////////////
// STEP COMPONENT
/////////////////////////////////////////////////////

function WorkflowStep({
    icon,
    title,
    role,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    role: string;
    desc: string;
}) {
    return (
        <div className="flex gap-4 items-start bg-white dark:bg-slate-900 p-6 rounded-xl border hover:shadow transition">

            <div className="text-blue-600 mt-1">{icon}</div>

            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-xs text-blue-600 mb-1">Role: {role}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
            </div>

        </div>
    );
}