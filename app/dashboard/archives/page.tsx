// app/dashboard/archives/page.tsx
import { Archives } from "./action";
import {
    Archive,
    BookText,
    ExternalLink,
    Calendar,
    Download,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ArchivesPage() {
    const volumes = Archives.data;

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Journal Archives
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Historical record of all published volumes, issues, and articles.
                    </p>
                </div>
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10 rounded-xl bg-white dark:bg-slate-900 border-none shadow-sm" placeholder="Search archives..." />
                </div>
            </div>

            {/* Volume Grid */}
            <div className="grid grid-cols-1 gap-8">
                {volumes.map((volume) => (
                    <div key={volume.volumeNumber} className="space-y-4">
                        <div className="flex items-center gap-3 px-2">
                            <Archive size={20} className="text-primary" />
                            <h2 className="text-xl font-bold">Volume {volume.volumeNumber} ({volume.year})</h2>
                            <Badge variant="outline" className="ml-2 font-mono">{volume.totalArticles} Articles</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {volume.issues.map((issue) => (
                                <div
                                    key={issue.issueNumber}
                                    className="bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                                                Issue {issue.issueNumber}
                                            </h3>
                                            <p className="text-xs text-muted-foreground flex items-center gap-2">
                                                <Calendar size={12} /> Published: {issue.publishDate}
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" className="rounded-xl h-9 gap-2">
                                            <Download size={14} /> Full Issue PDF
                                        </Button>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Featured Articles</p>
                                        <div className="space-y-2">
                                            {issue.articles.map((article) => (
                                                <div key={article.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <BookText size={16} className="text-slate-400 shrink-0" />
                                                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                                                            {article.title}
                                                        </p>
                                                    </div>
                                                    <ExternalLink size={14} className="text-slate-300 shrink-0" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Button variant="ghost" className="w-full mt-6 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl">
                                        View All Articles in Issue {issue.issueNumber}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}