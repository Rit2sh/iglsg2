import { AssignedManuscripts } from "./action"
import ReviewQueueTable from "../_components/ReviewQueueTable";
import {
    ClipboardList,
    Filter,
    Search,
    AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function ReviewQueuePage() {
    // In production, this would be: const manuscripts = await getAssignedManuscripts();
    const manuscripts = AssignedManuscripts.data;

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Review Queue
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage peer assignments and editorial decisions for assigned manuscripts.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2 rounded-xl">
                        <Filter size={16} /> Filter
                    </Button>
                </div>
            </div>

            {/* Tactical Search & Info */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            className="pl-10 h-12 bg-white dark:bg-slate-900 border-none shadow-sm rounded-2xl"
                            placeholder="Search by Anonymized ID or Title..."
                        />
                    </div>

                    <ReviewQueueTable manuscripts={manuscripts} />
                </div>

                {/* Sidebar Guidance */}
                <aside className="space-y-6">
                    <div className="p-6 bg-[#1E3A8A] text-white rounded-3xl shadow-xl shadow-blue-900/20">
                        <h3 className="font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-widest">
                            <ClipboardList size={18} /> Review Protocol
                        </h3>
                        <ul className="space-y-4 text-[11px] text-blue-100 leading-relaxed">
                            <li className="flex gap-2">
                                <span className="text-blue-300 font-bold">01.</span>
                                Assign minimum 3 reviewers per Research Article.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-300 font-bold">02.</span>
                                Ensure author identities are masked in all shared files.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-300 font-bold">03.</span>
                                Final decisions must be logged within 14 days of review completion.
                            </li>
                        </ul>
                    </div>

                    <div className="p-5 border border-dashed border-slate-300 rounded-3xl flex gap-3 items-start bg-slate-50/50">
                        <AlertCircle className="text-amber-600 shrink-0" size={18} />
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            <strong>Compliance Check:</strong> All reviewers must confirm no conflict of interest before accessing full-text manuscripts.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}