"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileCheck, ShieldAlert, Filter } from "lucide-react";
import { SubmitionsType } from "../action";
import { useRouter } from "next/navigation";

export function SubmissionsTable({ submissions }: { submissions: SubmitionsType }) {
    const router = useRouter();

    if (!submissions || submissions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 border rounded-2xl shadow-sm text-center w-full">
                <FileCheck className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
                <h3 className="text-lg font-bold">No submissions found</h3>
                <p className="text-sm text-muted-foreground mt-1">There are no manuscripts currently in the queue.</p>
            </div>
        );
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Manuscript Submissions</h2>
                    <p className="text-sm text-muted-foreground">Manage and track the peer-review lifecycle.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2"><Filter size={14} /> Filter</Button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-muted/50 text-[11px] uppercase tracking-widest font-bold text-muted-foreground">
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4">Manuscript</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Submitted date</th>
                            <th className="px-6 py-4 text-right">Assigned to</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {submissions.map((ms) => (
                            <tr key={ms.id} onClick={() => router.push(`/dashboard/submissions/${ms.id}?tab=reviews?m-title=${encodeURIComponent(ms.title)}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold leading-none">{ms.author.firstName} {ms.author.middleName ? ms.author.middleName : ""} {ms.author.lastName}</p>
                                        <p className="text-[11px] text-muted-foreground">{ms.author.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold leading-none">{ms.title}</p>
                                        {/* <p className="text-[11px] text-muted-foreground">ID: {ms.id}</p> */}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="secondary" className="text-[10px] font-bold uppercase">{ms.category}</Badge>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-600">{ms.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-600">
                                            {new Intl.DateTimeFormat("en-US", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            }).format(new Date(ms.createdAt))}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {ms.assignedEditor ? (
                                        <span className="text-xs font-bold text-slate-600">{ms.assignedEditor?.firstName} {ms.assignedEditor?.middleName ? ms.assignedEditor?.middleName : ""} {ms.assignedEditor?.lastName}</span>
                                    ) : (
                                        <Badge variant="secondary" className="text-[10px] font-bold uppercase">Unassigned</Badge>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}