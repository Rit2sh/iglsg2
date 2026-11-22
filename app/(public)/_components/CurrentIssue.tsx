import { Button } from '@/components/ui/button'
import { Archive, BookOpen, ExternalLink } from 'lucide-react'
import SectionTitle from './SectionTitle'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ARTICLES } from '@/Data/Articles'
import Link from 'next/link'

export default function CurrentIssue() {

    return (
        <Card className="border-0 shadow-none p-4">
            <SectionTitle
                action={{ label: "View Full Issue", href: "/current-issue" }}
            >
                Current Issue
            </SectionTitle>

            {/* Volume tag */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#020617] border border-[#E2E8F0] dark:border-[#1E293B] mb-5">
                <div>
                    <span className="text-[12.5px] font-bold text-[#0F172A] dark:text-[#F1F5F9]">Vol. 1 (2026) No. 1</span>
                    <span className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] ml-2">Published January 2026</span>
                </div>
                <Badge variant="outline" className="text-[10px] font-semibold text-[#1E3A8A] dark:text-[#38BDF8] border-[#1E3A8A]/20">
                    Open Access
                </Badge>
            </div>

            {/* Editorial */}
            <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                    <Badge
                        variant="outline"
                        className="text-[10px] font-semibold border-[#4F46E5]/30 text-[#4F46E5] dark:border-[#6366F1]/40 dark:text-[#818CF8] px-2 py-0"
                    >
                        Editorial
                    </Badge>
                </div>
                <div className="p-3.5 rounded-lg bg-[#F8FAFC] dark:bg-[#020617] border border-[#E2E8F0] dark:border-[#1E293B]">
                    <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
                        Law, Democracy and Social Transformation
                    </p>
                    <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                        Prof. Dr. Satendra Rajput
                    </p>
                </div>
            </div>

            {/* Articles */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Badge
                        variant="outline"
                        className="text-[10px] font-semibold border-[#0EA5E9]/30 text-[#0EA5E9] dark:border-[#22D3EE]/40 dark:text-[#22D3EE] px-2 py-0"
                    >
                        Articles
                    </Badge>
                </div>
                <div className="space-y-2">
                    {ARTICLES.map((article, i) => (
                        <div
                            key={i}
                            className="flex items-start justify-between gap-3 p-3.5 rounded-lg bg-[#F8FAFC] dark:bg-[#020617] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#1E3A8A]/30 dark:hover:border-[#38BDF8]/30 transition-colors cursor-pointer group"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F1F5F9] group-hover:text-[#1E3A8A] dark:group-hover:text-[#38BDF8] transition-colors leading-snug">
                                    {article.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8]">
                                        {article?.author?.name}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
                                    <span className="text-[11px] text-[#94A3B8]">{article.pageStart}</span>
                                </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#1E3A8A] dark:group-hover:text-[#38BDF8] shrink-0 mt-0.5 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-5 flex gap-2">
                <Link href="/current-issue">
                    <Button
                        variant="outline"
                        className="group h-9 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-transparent px-4 text-[13px] font-medium text-slate-700 dark:text-slate-300 shadow-sm transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-400 hover:shadow-none gap-2"
                    >
                        <BookOpen className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                        View Full Issue
                    </Button>
                </Link>

                <Link href="/archives">
                    <Button
                        variant="ghost"
                        className="group h-9 rounded-2xl px-4 text-[13px] font-medium text-slate-400 dark:text-slate-500 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-600 dark:hover:text-slate-300 gap-2"
                    >
                        <Archive className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                        Browse Archives
                    </Button>
                </Link>
            </div>
        </Card>
    )
}
