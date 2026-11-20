"use client";

import React from "react";
import {
    FileText,
    Download,
    Quote,
    Calendar,
    Layers,
    User,
    Globe,
    BookOpen,
    Share2,
    CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ARTICLES } from "@/Data/Articles";

export default function ArticleDetailPage({ article }: { article: any }) {

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* ── ISSN COMPLIANT HEADER ── */}
            <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed pb-4">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#1E3A8A] dark:text-[#3B82F6] uppercase tracking-widest">
                        <BookOpen size={16} />
                        {article.journalName}
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 tabular-nums">
                        Vol. {article.volume} ({article.issue}), {article.publicationPeriod} {article.publicationYear}, pp. {article.pageStart}-{article.pageEnd} [cite: 306]
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-2">
                        <Badge className="bg-[#0EA5E9]/10 text-[#0EA5E9] border-none px-3 py-1 capitalize">
                            {article.category}
                        </Badge>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 gap-1">
                            <CheckCircle2 size={12} /> Peer Reviewed [cite: 273]
                        </Badge>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-[#F1F5F9] leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-sm">
                        <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
                            <User size={18} className="text-[#0EA5E9]" />
                            {article.author.name}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Globe size={18} />
                            DOI: <span className="text-[#0EA5E9] hover:underline cursor-pointer">{article.doi}</span> [cite: 192]
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Calendar size={18} />
                            Published: {new Date(article.publishedAt || "").toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="pt-6 flex flex-wrap gap-3">
                    <Button asChild className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 gap-2 h-11 px-6">
                        {/* <Link href={finalPdf?.url} target="_blank" rel="noopener noreferrer">
                                <FileText size={18} /> Download Full-Text PDF
                            </Link> */}
                    </Button>
                    <Button variant="outline" className="gap-2 h-11 px-6">
                        <Quote size={18} /> How to Cite
                    </Button>
                    <Button variant="ghost" className="gap-2 h-11 px-4 text-slate-500">
                        <Share2 size={18} /> Share
                    </Button>
                </div>
            </div>

            {/* ── CONTENT SECTION ── */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-10">

                    {/* Abstract */}
                    <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                            <Layers className="text-[#0EA5E9]" size={20} /> Abstract
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">
                            {article.abstract} [cite: 195]
                        </p>
                    </section>

                    {/* Keywords */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.keywords.split(",").map((keyword: any) => (
                                <Badge key={keyword} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1">
                                    {keyword.trim()}
                                </Badge>
                            ))}
                        </div>
                    </section>

                </div>

                {/* ── SIDEBAR METADATA ── */}
                <aside className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-dashed border-slate-200">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Bibliographic Details</h4>
                        <div className="space-y-4">
                            <div className="text-[12px]">
                                <p className="text-slate-400 mb-1 uppercase font-bold">Issue Linkage</p>
                                <p className="font-semibold text-slate-700 dark:text-slate-200">
                                    Volume {article.volume}, Issue {article.issue} [cite: 159]
                                </p>
                            </div>
                            <div className="text-[12px]">
                                <p className="text-slate-400 mb-1 uppercase font-bold">Frequency</p>
                                <p className="font-semibold text-slate-700 dark:text-slate-200">Bi-Annual [cite: 284]</p>
                            </div>
                            <div className="text-[12px]">
                                <p className="text-slate-400 mb-1 uppercase font-bold">Pagination</p>
                                <p className="font-semibold text-slate-700 dark:text-slate-200">pp. {article.pageStart}-{article.pageEnd} </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-[#0EA5E9]/5 rounded-2xl border border-[#0EA5E9]/10">
                        <p className="text-[11px] text-[#0EA5E9] leading-relaxed font-medium">
                            This article is published under CC BY-NC-ND 4.0 International License.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}