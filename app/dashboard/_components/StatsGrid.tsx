// app/dashboard/board/_components/StatsGrid.tsx
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, FileCheck, Users } from "lucide-react";

export default function StatsGrid({ metrics }: { metrics: any }) {
    const stats = [
        { label: "Assigned to Me", value: metrics?.assignedCount || 0, icon: Users, color: "blue" },
        { label: "Awaiting Reviewers", value: metrics?.needsReviewers || 0, icon: Clock, color: "amber" },
        { label: "In Final Revision", value: metrics?.revisionCount || 0, icon: FileCheck, color: "emerald" },
        { label: "Ready for DOI", value: metrics?.readyForDoi || 0, icon: BookOpen, color: "purple" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden group hover:shadow-md transition-all">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={24} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}