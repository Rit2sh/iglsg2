import {
    Calendar,
    Layers,
    User
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { IArticle } from '@/lib/validation/articleSchema';

export default function ArticleCard({ article }: { article: IArticle }) {

    return (
        <div className="group relative bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl p-6 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#0EA5E9]/30">
            <div className="flex flex-col md:flex-row gap-6">

                {/* Left Content Area: Metadata & Title */}
                <div className="flex-1 space-y-3">

                    {/* Top Row: Category & Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-wider text-[#94A3B8]">
                        <Badge variant="secondary" className="bg-[#0EA5E9]/10 text-[#0EA5E9] border-none px-2 py-0 h-5 rounded-md capitalize">
                            {article.category}
                        </Badge>
                        <span className="flex items-center gap-1">
                            <Layers size={12} />
                            Vol {article.volume}, Issue {article.issue} ({article.publicationPeriod})
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hover:text-[#0EA5E9] cursor-help transition-colors">
                            DOI: {article.doi}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9] leading-snug group-hover:text-[#1E3A8A] dark:group-hover:text-[#3B82F6] transition-colors"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        <Link href={`/article/${article.id}`} className="hover:underline">
                            {article.title}
                        </Link>
                    </h3>

                    {/* Author Info */}
                    <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                        <User size={14} className="text-[#0EA5E9]" />
                        <span>{article.author.name}</span>
                    </div>

                    {/* Abstract Snippet */}
                    <p className="text-[13.5px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed line-clamp-2 italic">
                        {article.abstract}
                    </p>

                    {/* Bottom Row: Date & Journal Details */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-[12px] text-[#94A3B8]">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            Published: {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            }) : 'N/A'}
                        </span>
                        <span className="font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
                            {article.journalName}
                        </span>
                        <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[#64748B]">
                            pp. {article.pageStart}-{article.pageEnd}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}