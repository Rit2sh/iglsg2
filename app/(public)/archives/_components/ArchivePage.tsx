"use client";

import React from "react";
import Link from "next/link";
import {
    Archive,
    Calendar,
    Layers,
    ChevronRight,
    FileText,
    ArrowUpRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock Data Structure matching ISSN naming conventions [cite: 159]
const ARCHIVE_DATA = [
    {
        year: 2025,
        volumes: [
            {
                vol: 1,
                issues: [
                    { id: "v1i1", number: 1, period: "January - June", articleCount: 12, publishedAt: "2026-01-15" }
                ]
            },
            {
                vol: 1,
                issues: [
                    { id: "v1i1", number: 1, period: "January - June", articleCount: 12, publishedAt: "2026-01-15" }
                ]
            },
            {
                vol: 1,
                issues: [
                    { id: "v1i1", number: 1, period: "January - June", articleCount: 12, publishedAt: "2026-01-15" }
                ]
            },
        ]
    },
    {
        year: 2026,
        volumes: [
            {
                vol: 1,
                issues: [
                    { id: "v1i1", number: 1, period: "January - June", articleCount: 12, publishedAt: "2026-01-15" }
                ]
            },
            {
                vol: 1,
                issues: [
                    { id: "v1i1", number: 1, period: "January - June", articleCount: 12, publishedAt: "2026-01-15" }
                ]
            },
            {
                vol: 1,
                issues: [
                    { id: "v1i1", number: 1, period: "January - June", articleCount: 12, publishedAt: "2026-01-15" }
                ]
            },
        ]
    },
];

export default function ArchivesPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] py-16 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header Section [cite: 134, 157] */}
                <div className="mb-12 space-y-4">
                    <div className="flex items-center gap-3 text-[#0EA5E9]">
                        <Archive size={24} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Journal Archives</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-[#F1F5F9]"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Explore Past Issues
                    </h1>
                    <p className="text-[#64748B] dark:text-[#94A3B8] max-w-2xl text-lg">
                        Access the complete repository of the Journal of Intercontinental Academic Studies,
                        organized by year and volume.
                    </p>
                </div>

                {/* Yearly Sections [cite: 162-165, 178-183] */}
                <div className="space-y-12">
                    {ARCHIVE_DATA.map((yearGroup) => (
                        <section key={yearGroup.year} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl font-bold text-[#1E3A8A] dark:text-[#3B82F6]">{yearGroup.year}</h2>
                                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {yearGroup.volumes.map((vol) => (
                                    vol.issues.map((issue) => (
                                        <Link key={issue.id} href={`/issue/${issue.id}`}>
                                            <Card className="group hover:border-[#0EA5E9] transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden">
                                                <CardContent className="p-0 flex">
                                                    {/* Visual Marker */}
                                                    <div className="w-2 bg-[#1E3A8A] dark:bg-[#3B82F6]" />

                                                    <div className="p-6 flex-1 space-y-4">
                                                        <div className="flex justify-between items-start">
                                                            <div className="space-y-1">
                                                                <Badge variant="outline" className="text-[10px] uppercase font-bold text-[#94A3B8]">
                                                                    Volume {vol.vol} [cite: 159, 169]
                                                                </Badge>
                                                                <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                                                                    Issue {issue.number} [cite: 159, 169]
                                                                </h3>
                                                                <p className="text-sm font-medium text-slate-500 italic">
                                                                    {issue.period} [cite: 169, 177]
                                                                </p>
                                                            </div>
                                                            <ArrowUpRight className="text-slate-300 group-hover:text-[#0EA5E9] transition-colors" />
                                                        </div>

                                                        <div className="flex items-center gap-6 pt-2">
                                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                                <Calendar size={14} />
                                                                <span>Published: {issue.publishedAt}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                                <FileText size={14} />
                                                                <span>{issue.articleCount} Articles</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}