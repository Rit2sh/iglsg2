// app/dashboard/board/_components/ActiveQueue.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ShieldCheck, Users } from "lucide-react";

export default function ActiveQueue({ manuscripts }: { manuscripts: any[] }) {
    return (
        <div className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 border-b">
                        <th className="px-6 py-5">Manuscript ID & Title</th>
                        <th className="px-6 py-5">Stage</th>
                        <th className="px-6 py-5">Reviewer Status</th>
                        <th className="px-6 py-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {manuscripts.map((ms) => (
                        <tr key={ms.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                            <td className="px-6 py-5">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs">{ms.title}</p>
                                    <p className="text-[10px] text-slate-400 flex items-center gap-2">
                                        <ShieldCheck size={12} className="text-emerald-500" />
                                        ANONYMIZED ID: {ms.id}
                                    </p>
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <Badge variant="secondary" className="uppercase text-[9px] font-bold tracking-widest px-2 py-0.5">
                                    {ms.stage.replace("_", " ")}
                                </Badge>
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-slate-300" />
                                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                                        {ms.reviewersCount}/3 Assigned
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-right">
                                <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9">
                                    <MoreHorizontal size={18} className="text-slate-400" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}