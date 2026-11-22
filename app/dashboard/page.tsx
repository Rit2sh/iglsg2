// app/dashboard/board/page.tsx
import {
    BookOpen,
    Clock,
    FileCheck,
    Users,
    AlertCircle
} from "lucide-react";
import StatsGrid from "./_components/StatsGrid";
import ActiveQueue from "./_components/ActiveQueue";
import EBVerificationStatus from "./_components/EBVerificationStatus";
import { getBoardMetrics, getAssignedManuscripts } from "./action";

export default async function BoardDashboardPage() {
    // Parallel fetch for dashboard data
    // const [metrics, manuscripts] = await Promise.all([
    //     getBoardMetrics(),
    //     getAssignedManuscripts()
    // ]);
    const metrics = getBoardMetrics;
    const manuscripts = getAssignedManuscripts;

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* ── HEADER SECTION ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Editorial Oversight
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Monitoring {manuscripts.data?.length || 0} active peer-review cycles.
                    </p>
                </div>

                <div className="bg-[#1E3A8A]/5 px-4 py-2 rounded-xl border border-[#1E3A8A]/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A8A]">
                        Current Issue: Vol. 1 (1) - 2026
                    </span>
                </div>
            </div>

            {/* ── METRICS SECTION ── */}
            <StatsGrid metrics={metrics.data} />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* ── MAIN QUEUE (High Priority) ── */}
                <div className="xl:col-span-3 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <BookOpen size={20} className="text-primary" />
                            Manuscript Queue
                        </h2>
                    </div>
                    <ActiveQueue manuscripts={manuscripts.data || []} />
                </div>

                {/* ── SIDEBAR (Governance & Compliance) ── */}
                <aside className="space-y-8">
                    <EBVerificationStatus />

                    <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <AlertCircle size={16} className="text-amber-400" />
                            Compliance Reminder
                        </h3>
                        <ul className="space-y-4 text-[11px] leading-relaxed text-slate-300">
                            <li className="flex gap-2">
                                <span className="text-amber-400 font-bold">•</span>
                                Verify that author identities are completely masked in the Reviewer View.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-amber-400 font-bold">•</span>
                                Assign at least three reviewers for each Research Article.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-amber-400 font-bold">•</span>
                                Ensure citations align with The Bluebook or ILI standards.
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}