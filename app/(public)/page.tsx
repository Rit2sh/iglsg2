import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    FileText,
    Users,
    BookMarked,
    Mail,
    Globe,
    Calendar,
    Building2,
    ExternalLink,
    ChevronRight,
    Award,
    Send,
    ShieldCheck,
    Layers,
    BarChart3,
    Star,
    Quote,
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
    icon: React.ElementType;
    desc: string;
    color: string;
}

interface Publication {
    title: string;
    category: string;
}

interface JournalStat {
    label: string;
    value: string;
    icon: React.ElementType;
}

// ── Data ─────────────────────────────────────────────────────────
const QUICK_LINKS: QuickLink[] = [
    {
        label: "Submit Manuscript",
        href: "/submission",
        icon: Send,
        desc: "Online submission portal",
        color: "bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50 hover:border-[#1E3A8A]/40",
    },
    {
        label: "Author Guidelines",
        href: "/guidelines",
        icon: FileText,
        desc: "Formatting & style guide",
        color: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/50 hover:border-[#4F46E5]/40",
    },
    {
        label: "Review & Ethics Policy",
        href: "/more/ethics",
        icon: ShieldCheck,
        desc: "Peer review standards",
        color: "bg-sky-50 dark:bg-sky-950/40 border-sky-100 dark:border-sky-900/50 hover:border-[#0EA5E9]/40",
    },
    {
        label: "Subscribe",
        href: "/subscribe",
        icon: Mail,
        desc: "Get new issue alerts",
        color: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-500/40",
    },
];



const PUBLICATIONS: Publication[] = [
    { title: "Working Paper Series on Constitutional Governance", category: "Working Papers" },
    { title: "Conference Proceedings on Law and Public Policy", category: "Proceedings" },
    { title: "Edited Volume on Socio-Legal Research", category: "Book Volume" },
    { title: "Policy Brief Series on Justice Reform", category: "Policy Brief" },
];

const STATS: JournalStat[] = [
    { label: "Articles Published", value: "24+", icon: FileText },
    { label: "Editorial Members", value: "12", icon: Users },
    { label: "Countries Reached", value: "18+", icon: Globe },
    { label: "Citations", value: "120+", icon: BarChart3 },
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
                                    { label: "Editor-in-Chief", value: "Dr. Satish Chandra Shastri", icon: Award },
                                    { label: "Current Issue", value: "Vol. 1 (2026) No. 1", icon: BookMarked, href: "/current-issue" },
                                    { label: "ISSN (Online)", value: "XXXX-XXXX", icon: Layers },
                                ].map(({ label, value, icon: Icon, href }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                                            <Icon className="w-3.5 h-3.5 text-white/80" />
                                        </div>
                                        <div>
                                            <p className="text-[10.5px] font-semibold text-white/50 uppercase tracking-wider">
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
                                    </div>
                                ))}
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-2 gap-2 pt-2">
                                {STATS.map(({ label, value, icon: Icon }) => (
                                    <div
                                        key={label}
                                        className="bg-white/10 border border-white/15 rounded-xl px-3 py-2.5 flex items-center gap-2.5"
                                    >
                                        <Icon className="w-3.5 h-3.5 text-[#7DD3FC] shrink-0" />
                                        <div>
                                            <p className="text-[14px] font-bold text-white leading-none">{value}</p>
                                            <p className="text-[10px] text-white/50 mt-0.5 leading-tight">{label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CENTER — About */}
                        <div className="md:col-span-1">
                            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl p-6 h-full">
                                <div className="flex items-center gap-2 mb-4">
                                    <Quote className="w-4 h-4 text-[#7DD3FC]" />
                                    <h2
                                        className="text-[17px] font-bold text-white"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        About the Journal
                                    </h2>
                                </div>

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
                        <div className="space-y-2.5">
                            <p className="text-[10.5px] font-bold text-white/45 uppercase tracking-widest mb-3">
                                Quick Access
                            </p>
                            {QUICK_LINKS.map(({ label, href, icon: Icon, desc, color }) => (
                                <Link key={label} href={href}>
                                    <div
                                        className={cn(
                                            "flex items-center gap-3.5 p-4 rounded-xl border transition-all duration-150 cursor-pointer group",
                                            "bg-white dark:bg-[#0F172A]",
                                            "border-[#E2E8F0] dark:border-[#1E293B]",
                                            "hover:border-[#1E3A8A]/30 dark:hover:border-[#3B82F6]/30",
                                            "hover:shadow-[0_4px_16px_rgba(30,58,138,.12)]",
                                            "hover:-translate-y-0.5 mb-1.5"
                                        )}
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-[#9fe2f8] dark:bg-[#1E293B] flex items-center justify-center shrink-0 group-hover:bg-[#1E3A8A] dark:group-hover:bg-[#3B82F6] transition-colors">
                                            <Icon className={`w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6] group-hover:text-white transition-colors`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
                                                {label}
                                            </p>
                                            <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">{desc}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#1E3A8A] dark:group-hover:text-[#3B82F6] shrink-0 transition-colors" />
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
                            <SectionTitle icon={BookOpen}>Journal Particulars</SectionTitle>
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
                            <SectionTitle icon={Building2}>Publisher</SectionTitle>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#1E3A8A] to-[#4F46E5] flex items-center justify-center shrink-0">
                                    <Building2 className="w-5 h-5 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[13px] font-bold text-[#0F172A] dark:text-[#F1F5F9] leading-snug">
                                        Axiara Private Limited
                                    </p>
                                    <div className="flex items-center gap-1.5 text-[12px] text-[#64748B] dark:text-[#94A3B8]">
                                        <Globe className="w-3 h-3 shrink-0" />
                                        India
                                    </div>
                                    <Link
                                        href="mailto:editor@ijlsg.org"
                                        className="flex items-center gap-1.5 text-[12px] text-[#0EA5E9] dark:text-[#22D3EE] hover:underline font-medium"
                                    >
                                        <Mail className="w-3 h-3 shrink-0" />
                                        editor@ijlsg.org
                                    </Link>
                                </div>
                            </div>
                        </Card>

                        {/* Indexed In */}
                        <Card className="p-5">
                            <SectionTitle icon={Award}>Indexed In</SectionTitle>
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
                                <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                                    <Send className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Submit Your Research
                                    </h4>
                                    <p className="text-[12px] text-white/65 leading-relaxed mt-1">
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
                        <SectionTitle icon={Globe} action={{ label: "View All", href: "/publications" }}>
                            Other Publications
                        </SectionTitle>

                        <div className="grid sm:grid-cols-2 gap-2.5">
                            {PUBLICATIONS.map(({ title, category }, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#020617] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#1E3A8A]/30 dark:hover:border-[#3B82F6]/30 hover:-translate-y-0.5 transition-all cursor-pointer group"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] dark:bg-[#1E293B] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1E3A8A] dark:group-hover:bg-[#3B82F6] transition-colors">
                                        <Layers className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#3B82F6] group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12.5px] font-semibold text-[#0F172A] dark:text-[#F1F5F9] leading-snug">
                                            {title}
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="mt-1.5 text-[9.5px] font-semibold border-[#E2E8F0] dark:border-[#1E293B] text-[#64748B] dark:text-[#94A3B8] px-1.5 py-0"
                                        >
                                            {category}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}

