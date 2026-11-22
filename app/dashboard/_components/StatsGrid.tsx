// app/dashboard/board/_components/StatsGrid.tsx
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, FileCheck, Users } from "lucide-react";

export default function StatsGrid({ metrics }: { metrics: any }) {
    const stats = [
        { label: "Assigned to Me", value: metrics?.assignedCount || 0, icon: Users },
        { label: "Awaiting Reviewers", value: metrics?.needsReviewers || 0, icon: Clock },
        { label: "In Final Revision", value: metrics?.revisionCount || 0, icon: FileCheck },
        { label: "Ready for DOI", value: metrics?.readyForDoi || 0, icon: BookOpen },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="border border-border/60 shadow-xs bg-white dark:bg-slate-900 rounded-xl">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{stat.value}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                            <stat.icon size={20} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}