import Link from "next/link";
import {
    ArrowRight,
    ExternalLink,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import EditorialBoard from "./_components/EditorialBoard";
import SectionTitle from "./_components/SectionTitle";
import CurrentIssue from "./_components/CurrentIssue";

// ── Types ────────────────────────────────────────────────────────
interface QuickLink {
    label: string;
    href: string;
    desc: string;
}

interface Publication {
    title: string;
    category: string;
}

interface JournalStat {
    label: string;
    value: string;
}

// ── Data ─────────────────────────────────────────────────────────
const QUICK_LINKS: QuickLink[] = [
    {
        label: "Submit Manuscript",
        href: "/submission",
        desc: "Online submission portal",
    },
    {
        label: "Author Guidelines",
        href: "/guidelines",
        desc: "Formatting & style guide",
    },
    {
        label: "Review & Ethics Policy",
        href: "/more/ethics",
        desc: "Peer review standards",
    },
    {
        label: "Subscribe",
        href: "/subscribe",
        desc: "Get new issue alerts",
    },
];

const PUBLICATIONS: Publication[] = [
    { title: "Working Paper Series on Constitutional Governance", category: "Working Papers" },
    { title: "Conference Proceedings on Law and Public Policy", category: "Proceedings" },
    { title: "Edited Volume on Socio-Legal Research", category: "Book Volume" },
    { title: "Policy Brief Series on Justice Reform", category: "Policy Brief" },
];

const STATS: JournalStat[] = [
    { label: "Articles Published", value: "24+" },
    { label: "Editorial Members", value: "12" },
    { label: "Countries Reached", value: "18+" },
    { label: "Citations", value: "120+" },
];


// ────────────────────────────────────────────────────────────────
//  HOME PAGE
// ────────────────────────────────────────────────────────────────
export default function HomePage() {
    return (
        <div
            className="bg-[#F8FAFC] dark:bg-[#020617] text-[#0F172A] dark:text-[#F1F5F9] min-h-screen"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >

            {/* ── HERO BANNER ──────────────────────────────────────── */}
            <section className="relative overflow-hidden border-b border-[#E2E8F0] dark:border-[#1E293B]">
                {/* Background */}
                <div className="absolute inset-0 bg-linear-to-br from-[#295df2] via-[#2251d6] to-[#5950e6] dark:from-[#0C2461] dark:via-[#0F172A] dark:to-[#1E293B]" />
                <div className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                        backgroundSize: "32px 32px",
                    }}
                />
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0EA5E9] opacity-10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4F46E5] opacity-15 rounded-full blur-[60px] -translate-x-1/4 translate-y-1/4" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                    <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-start">

                        {/* LEFT — Journal meta */}
                        <div className="space-y-5">
                            <div>
                                <Badge className="bg-white/15 text-white border-0 text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider mb-3">
                                    Peer-Reviewed Journal
                                </Badge>
                                <h1
                                    className="text-[22px] sm:text-[26px] font-bold text-white leading-tight"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    Journal of Intercontinental Academic Studies
                                </h1>
                            </div>

                            <Separator className="bg-white/15" />

                            <div className="space-y-3.5">
                                {[
                                    { label: "Editor-in-Chief", value: "Dr. Satish Chandra Shastri" },
                                    { label: "Current Issue", value: "Vol. 1 (2026) No. 1", href: "/current-issue" },
                                    { label: "ISSN (Online)", value: "XXXX-XXXX" },
                                ].map(({ label, value, href }) => (
                                    <div key={label} className="border-l-2 border-white/25 pl-3 py-0.5">
                                        <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                                            {label}
                                        </p>
                                        {href ? (
                                            <Link
                                                href={href}
                                                className="text-[13px] font-semibold text-[#7DD3FC] hover:text-white hover:underline flex items-center gap-1 transition-colors"
                                            >
                                                {value}
                                                <ExternalLink className="w-3 h-3" />
                                            </Link>
                                        ) : (
                                            <p className="text-[13px] font-semibold text-white">{value}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-2 gap-2 pt-2">
                                {STATS.map(({ label, value }) => (
                                    <div
                                        key={label}
                                        className="bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5"
                                    >
                                        <p className="text-[15px] font-bold text-white leading-none">{value}</p>
                                        <p className="text-[10.5px] text-white/50 mt-1 leading-tight">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CENTER — About */}
                        <div className="md:col-span-1">
                            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl p-6 h-full">
                                <h2
                                    className="text-[17px] font-bold text-white mb-4"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    About the Journal
                                </h2>

                                <p className="text-[13.5px] text-white/75 leading-relaxed">
                                    The <span className="text-white font-semibold">Journal of Intercontinental Academic Studies</span> is
                                    a peer-reviewed academic journal devoted to interdisciplinary research
                                    and innovative scholarship.
                                </p>

                                <p className="text-[13.5px] text-white/70 leading-relaxed mt-3">
                                    It promotes analytical, empirical, and doctrinal research to enhance
                                    understanding of governance structures and their societal implications.
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Law", "Governance", "Public Policy", "Constitutional Studies", "Socio-Legal"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[11px] font-medium text-white/75 bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Link href="/about">
                                    <Button
                                        className="mt-5 w-full bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold text-[13px] rounded-xl gap-2 shadow-[0_2px_12px_rgba(0,0,0,.15)]"
                                    >
                                        Read More About the Journal
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT — Quick links */}
                        <div className="space-y-2">
                            <p className="text-[10.5px] font-bold text-white/50 uppercase tracking-widest mb-3">
                                Quick Access
                            </p>
                            {QUICK_LINKS.map(({ label, href, desc }) => (
                                <Link key={label} href={href} className="block">
                                    <div
                                        className={cn(
                                            "group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-150 cursor-pointer",
                                            "bg-white dark:bg-[#0F172A]",
                                            "border-[#E2E8F0] dark:border-[#1E293B]",
                                            "hover:border-[#1E3A8A]/30 dark:hover:border-[#38BDF8]/40",
                                            "hover:shadow-[0_4px_16px_rgba(30,58,138,.10)]",
                                            "hover:translate-x-1"
                                        )}
                                    >
                                        <div className="flex-1 min-w-0 pr-3">
                                            <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F1F5F9] group-hover:text-[#1E3A8A] dark:group-hover:text-[#38BDF8] transition-colors">
                                                {label}
                                            </p>
                                            <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-0.5 leading-snug">
                                                {desc}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#1E3A8A] dark:group-hover:text-[#38BDF8] shrink-0 transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAIN CONTENT ─────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-start">

                    {/* ── LEFT COLUMN (2/3) ──────────────────────────── */}
                    <div className="md:col-span-2 space-y-6">

                        {/* CURRENT ISSUE */}
                        <CurrentIssue />

                    </div>

                    {/* ── SIDEBAR (1/3) ────────────────────────────────── */}
                    <div className="space-y-5">

                        {/* Journal Particulars */}
                        <Card className="p-5">
                            <SectionTitle>Journal Particulars</SectionTitle>
                            <div className="space-y-3">
                                {[
                                    { label: "Frequency", value: "Quarterly" },
                                    { label: "Starting Year", value: "2026" },
                                    { label: "Language", value: "English" },
                                    { label: "Format", value: "Online (Open Access)" },
                                    { label: "ISSN (Online)", value: "XXXX-XXXX" },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] dark:border-[#1E293B] last:border-0">
                                        <span className="text-[12px] text-[#64748B] dark:text-[#94A3B8] font-medium">{label}</span>
                                        <span className="text-[12.5px] font-semibold text-[#0F172A] dark:text-[#F1F5F9]">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Publisher */}
                        <Card className="p-5">
                            <SectionTitle>Publisher</SectionTitle>
                            <div className="space-y-1.5">
                                <p className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F1F5F9] leading-snug">
                                    Axiara Private Limited
                                </p>
                                <p className="text-[12px] text-[#64748B] dark:text-[#94A3B8]">
                                    India
                                </p>
                                <Link
                                    href="mailto:editor@ijlsg.org"
                                    className="inline-block text-[12px] text-[#0EA5E9] dark:text-[#22D3EE] hover:underline font-medium"
                                >
                                    editor@ijlsg.org
                                </Link>
                            </div>
                        </Card>

                        {/* Indexed In */}
                        <Card className="p-5">
                            <SectionTitle>Indexed In</SectionTitle>
                            <div className="grid grid-cols-2 gap-2">
                                {["Google Scholar", "DOAJ", "CrossRef", "Index Copernicus"].map((idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#020617] border border-[#E2E8F0] dark:border-[#1E293B]"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                                        <span className="text-[11px] font-medium text-[#0F172A] dark:text-[#F1F5F9] leading-tight">
                                            {idx}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* CTA — Submit */}
                        <div className="rounded-2xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-linear-to-br from-[#1E3A8A] to-[#4F46E5]" />
                            <div className="absolute inset-0 opacity-[0.08]"
                                style={{
                                    backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                                    backgroundSize: "24px 24px",
                                }}
                            />
                            <div className="relative p-5 space-y-3">
                                <div>
                                    <h4 className="text-[15px] font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Submit Your Research
                                    </h4>
                                    <p className="text-[12px] text-white/70 leading-relaxed mt-1">
                                        We welcome original research on law, governance, and public policy.
                                    </p>
                                </div>
                                <Link href="/submission">
                                    <Button className="w-full bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold text-[12.5px] rounded-xl gap-2 mt-1 shadow-[0_2px_12px_rgba(0,0,0,.15)]">
                                        Submit Manuscript
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="flex w-full flex-col gap-6 sm:gap-8 mt-2">
                    <EditorialBoard />

                    {/* OTHER PUBLICATIONS */}
                    <Card className="p-4">
                        <SectionTitle action={{ label: "View All", href: "/publications" }}>
                            Other Publications
                        </SectionTitle>

                        <div className="grid sm:grid-cols-2 gap-2.5">
                            {PUBLICATIONS.map(({ title, category }, i) => (
                                <div
                                    key={i}
                                    className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#020617] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#1E3A8A]/30 dark:hover:border-[#3B82F6]/30 hover:-translate-y-0.5 transition-all cursor-pointer group"
                                >
                                    <p className="text-[12.5px] font-semibold text-[#0F172A] dark:text-[#F1F5F9] leading-snug">
                                        {title}
                                    </p>
                                    <Badge
                                        variant="outline"
                                        className="mt-2 text-[9.5px] font-semibold border-[#E2E8F0] dark:border-[#1E293B] text-[#64748B] dark:text-[#94A3B8] px-1.5 py-0"
                                    >
                                        {category}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}

