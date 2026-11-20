// app/dashboard/submissions/[id]/_components/AuthorVerification.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, ShieldCheck, UserCheck, AlertTriangle } from "lucide-react";

export default function AuthorVerification({ author }: { author: any }) {
    return (
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="bg-muted/30 border-b pb-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                    <UserCheck size={16} /> Author Verification
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-xl mb-4">
                    <AvatarImage src={author?.avatar} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {author?.firstName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {author?.firstName} {author?.lastName}
                </h3>

                <div className="flex items-center gap-2 mt-2 mb-6">
                    <Mail size={14} className="text-muted-foreground" />
                    <span className="text-sm text-slate-500">{author?.email}</span>
                </div>

                <div className="w-full space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Status</span>
                        {author?.emailVerified ? (
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 gap-1 px-2">
                                <ShieldCheck size={12} /> Verified
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="text-amber-600 border-amber-200 gap-1 px-2">
                                <AlertTriangle size={12} /> Pending
                            </Badge>
                        )}
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Ensure the author's affiliation matches the manuscript's metadata before proceeding to the review stage.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}