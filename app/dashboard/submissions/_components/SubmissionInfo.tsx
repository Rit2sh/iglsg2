// app/dashboard/submissions/[id]/_components/SubmissionInfo.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Tags } from "lucide-react";

export default function SubmissionInfo({ data }: { data: any }) {
    return (
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b pb-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                    <Layers size={16} /> Manuscript Information
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Abstract</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                        {data.abstract}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Category</h4>
                        <Badge variant="outline" className="capitalize px-4 py-1 text-sm">{data.category}</Badge>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                            {data.keywords?.split(",").map((k: string) => (
                                <Badge key={k} className="bg-slate-100 text-slate-600 border-none">{k.trim()}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}