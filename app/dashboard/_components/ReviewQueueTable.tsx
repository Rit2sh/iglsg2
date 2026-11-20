import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Users,
    FileText,
    MoreVertical,
    History,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function ReviewQueueTable({ manuscripts }: { manuscripts: any[] }) {
    return (
        <div className="bg-white dark:bg-slate-900 border rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 border-b">
                        <th className="px-6 py-5">Manuscript ID</th>
                        <th className="px-6 py-5">Review Progress</th>
                        <th className="px-6 py-5">Status</th>
                        <th className="px-6 py-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {manuscripts.map((ms) => (
                        <tr key={ms.id} className="group hover:bg-slate-50/30 dark:hover:bg-slate-800/10 transition-colors">
                            <td className="px-6 py-5">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {ms.title}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-[9px] font-mono border-slate-200">
                                            {ms.id}
                                        </Badge>
                                        <span className="text-[10px] text-slate-400">• {ms.category}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[...Array(3)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold ${i < ms.reviewersCount ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
                                                    }`}
                                            >
                                                {i < ms.reviewersCount ? <CheckCircle2 size={12} /> : i + 1}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-xs font-semibold text-slate-500">
                                        {ms.reviewersCount}/3 Reviewers
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <Badge
                                    className={`rounded-lg uppercase text-[9px] font-bold tracking-widest px-2 py-1 border-none shadow-sm ${ms.stage === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700' :
                                        ms.stage === 'REVISIONS_REQUIRED' ? 'bg-amber-50 text-amber-700' :
                                            'bg-blue-50 text-blue-700'
                                        }`}
                                >
                                    {ms.stage.replace("_", " ")}
                                </Badge>
                            </td>
                            <td className="px-6 py-5 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl" asChild>
                                        <Link href={`/dashboard/submissions/${ms.id}`}>
                                            <FileText size={18} className="text-slate-400" />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                                        <MoreVertical size={18} className="text-slate-400" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}