import Link from "next/link";
import {
    BookOpen,
    Target,
    Building2,
    Users,
    ShieldCheck,
    Mail,
    Globe,
    Award,
    Quote,
    ArrowRight,
    CheckCircle2,
    Layers,
    Scale,
    Lightbulb,
    GraduationCap,
    Handshake,
    MapPin,
    Phone,
    ExternalLink,
    ChevronRight,
    FileSearch,
    BarChart3,
    Clock,
    Send,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import EditorialBoard from "../_components/EditorialBoard";

// ── Types ────────────────────────────────────────────────────────
interface Leader {
    role: string;
    name: string;
    bio: string;
    initials: string;
    gradient: string;
}

interface Aim {
    icon: React.ElementType;
    title: string;
    desc: string;
}

interface Stat {
    icon: React.ElementType;
    value: string;
    label: string;
    color: string;
}

interface ReviewStep {
    step: number;
    title: string;
    desc: string;
    icon: React.ElementType;
}

interface Founder {
    name: string;
    role: string;
    bio: string;
    initials: string;
}

// ── Data ─────────────────────────────────────────────────────────
const LEADERS: Leader[] = [
    {
        role: "Patron",
        name: "Dr. Upendra Baxi",
        bio: "Distinguished Professor of Law at the University of Warwick, UK, and globally recognized scholar of human rights, legal theory, and international law.",
        initials: "UB",
        gradient: "from-[#1E3A8A] to-[#4F46E5]",
    },
    {
        role: "Editor-in-Chief",
        name: "Dr. Satish Chandra Shastri",
        bio: "Professor Emeritus with over 35 years of academic, research, and administrative experience in constitutional law and governance studies.",
        initials: "SS",
        gradient: "from-[#4F46E5] to-[#0EA5E9]",
    },
    {
        role: "Editorial Director",
        name: "Dr. S. S. Jaswal",
        bio: "Professor of Law at HP National Law University, Shimla, India. Expert in constitutional law, human rights, and federal governance.",
        initials: "SJ",
        gradient: "from-[#0EA5E9] to-[#1E3A8A]",
    },
];

const FOUNDERS: Founder[] = [
    {
        name: "Mr. Narendra Singh Rajpoot",
        role: "Co-Founder",
        bio: "A visionary leader dedicated to promoting academic research and institutional development. His work focuses on building sustainable knowledge ecosystems that bridge scholarship and public service.",
        initials: "NR",
    },
    {
        name: "Dr. Satendra Rajput",
        role: "Founder & Director",
        bio: "Founder of NanaG. Knowledge Foundation, academician, and researcher focused on socio-legal transformation and governance systems. Known for his interdisciplinary approach bridging law and social sciences.",
        initials: "SR",
    },
];

const AIMS: Aim[] = [
    {
        icon: Scale,
        title: "Promote Legal Research",
        desc: "Publish high-quality research in law, governance, and public policy from scholars across disciplines.",
    },
    {
        icon: Lightbulb,
        title: "Interdisciplinary Dialogue",
        desc: "Encourage discourse combining law, sociology, political science, economics, and emerging technologies.",
    },
    {
        icon: Target,
        title: "Address Contemporary Challenges",
        desc: "Engage with pressing legal and socio-political issues shaping governance in the 21st century.",
    },
    {
        icon: FileSearch,
        title: "Research Methodologies",
        desc: "Support both empirical and doctrinal research while welcoming analytical and comparative approaches.",
    },
    {
        icon: Handshake,
        title: "Theory to Practice",
        desc: "Bridge the gap between academic scholarship and real-world legal and governance application.",
    },
    {
        icon: GraduationCap,
        title: "Scholar Development",
        desc: "Provide emerging researchers, practitioners, and policymakers a credible platform for publication.",
    },
];

const STATS: Stat[] = [
    { icon: BookOpen, value: "24+", label: "Articles Published", color: "text-[#1E3A8A] dark:text-[#3B82F6] bg-blue-50 dark:bg-[#1E3A8A]/20" },
    { icon: Users, value: "12", label: "Editorial Members", color: "text-[#4F46E5] dark:text-[#818CF8] bg-indigo-50 dark:bg-[#4F46E5]/20" },
    { icon: Globe, value: "18+", label: "Countries Reached", color: "text-[#0EA5E9] dark:text-[#22D3EE] bg-sky-50 dark:bg-[#0EA5E9]/20" },
    { icon: BarChart3, value: "120+", label: "Total Citations", color: "text-[#22C55E] dark:text-[#4ADE80] bg-green-50 dark:bg-[#22C55E]/20" },
    { icon: Clock, value: "21", label: "Avg. Review Days", color: "text-[#F59E0B] dark:text-[#FBBF24] bg-amber-50 dark:bg-[#F59E0B]/20" },
    { icon: ShieldCheck, value: "100%", label: "Peer-Reviewed", color: "text-[#0284C7] dark:text-[#38BDF8] bg-sky-50 dark:bg-[#0284C7]/20" },
];

const REVIEW_STEPS: ReviewStep[] = [
    {
        step: 1,
        icon: Send,
        title: "Manuscript Submission",
        desc: "Authors submit manuscripts via our online portal. Initial desk review checks compliance with scope and formatting guidelines.",
    },
    {
        step: 2,
        icon: FileSearch,
        title: "Editorial Screening",
        desc: "The Editor-in-Chief conducts a preliminary screening for originality, relevance, and academic merit before peer review assignment.",
    },
    {
        step: 3,
        icon: Users,
        title: "Double-Blind Review",
        desc: "Two or more independent experts review the manuscript anonymously. Authors' identities remain hidden from reviewers and vice versa.",
    },
    {
        step: 4,
        icon: CheckCircle2,
        title: "Editorial Decision",
        desc: "Based on reviewer feedback, the editor makes a decision: Accept, Minor Revision, Major Revision, or Reject — within 21 days on average.",
    },
];

const TOPICS: string[] = [
    "Constitutional Law",
    "Administrative Law",
    "Human Rights",
    "Environmental Law",
    "International Law",
    "Digital Governance",
    "Social Justice",
    "Federal Studies",
    "Judicial Reform",
    "Policy Analysis",
    "Legal Philosophy",
    "Criminal Justice",
];

// ── Reusable sub-components ───────────────────────────────────────
function SectionTag({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#0EA5E9]" />
            <span className="text-[11px] font-bold text-[#0EA5E9] uppercase tracking-widest">
                {children}
            </span>
        </div>
    );
}

function Card({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "bg-white dark:bg-[#0F172A] rounded-2xl",
                "border border-[#E2E8F0] dark:border-[#1E293B]",
                "shadow-[0_1px_8px_rgba(15,23,42,.05)] dark:shadow-none",
                "p-6 sm:p-8",
                className
            )}
        >
            {children}
        </div>
    );
}

// ────────────────────────────────────────────────────────────────
//  ABOUT PAGE
// ────────────────────────────────────────────────────────────────
export default function AboutPage() {
    return (
        <div
            className="bg-[#F8FAFC] dark:bg-[#020617] text-[#0F172A] dark:text-[#F1F5F9] min-h-screen"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative overflow-hidden border-b border-[#E2E8F0] dark:border-[#1E293B]">
                {/* BG */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A] to-[#4F46E5] dark:from-[#0C2461] dark:via-[#0F172A] dark:to-[#1E293B]" />
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                        backgroundSize: "32px 32px",
                    }}
                />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0EA5E9] opacity-10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4F46E5] opacity-15 rounded-full blur-[60px] -translate-x-1/4 translate-y-1/4" />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
                    <Badge className="bg-white/15 hover:bg-white/20 text-white border-0 text-[10.5px] font-semibold px-3 py-1 gap-1.5 mb-5 inline-flex">
                        <BookOpen className="w-3 h-3" />
                        Est. 2026 · Open Access · Peer-Reviewed
                    </Badge>

                    <h1
                        className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-white leading-tight mb-5"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        About the Journal
                    </h1>

                    <p className="text-[15px] sm:text-[17px] text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
                        Journal of Intercontinental Academic Studies (JIAS) — a peer-reviewed,
                        open-access platform advancing interdisciplinary scholarship globally.
                    </p>

                    {/* Stat strip */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        {STATS.map(({ value, label, icon: Icon }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-4 py-2"
                            >
                                <Icon className="w-3.5 h-3.5 text-[#7DD3FC]" />
                                <span className="text-[13px] font-bold text-white">{value}</span>
                                <span className="text-[11.5px] text-white/55">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MAIN ─────────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">

                {/* OVERVIEW ──────────────────────────────────────────── */}
                <Card>
                    <SectionTag>Overview</SectionTag>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <h2
                                className="text-[22px] sm:text-[26px] font-bold text-[#0F172A] dark:text-[#F1F5F9] leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                A Premier Platform for Legal Scholarship
                            </h2>
                            <p className="text-[14px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                                The <span className="text-[#1E3A8A] dark:text-[#3B82F6] font-semibold">Journal of Intercontinental Academic Studies (JIAS)</span> is
                                a peer-reviewed, open-access academic journal dedicated to fostering high-quality research
                                across interdisciplinary studies, governance, public policy, and socio-economic frameworks.
                            </p>
                            <p className="text-[14px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                                The journal provides a rigorous yet inclusive platform for scholars, practitioners,
                                policymakers, and emerging researchers to engage in critical discourse on contemporary
                                legal and governance challenges — combining analytical, empirical, and doctrinal frameworks.
                            </p>
                            <p className="text-[14px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                                It encourages interdisciplinary approaches weaving together law, sociology, political
                                science, economics, philosophy, and emerging digital technologies — reflecting the
                                complex realities of 21st-century governance.
                            </p>
                        </div>

                        {/* Topic cloud */}
                        <div className="bg-[#F8FAFC] dark:bg-[#020617] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] p-6">
                            <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4">
                                Covered Topics
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {TOPICS.map((t) => (
                                    <span
                                        key={t}
                                        className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-[#0F172A] dark:text-[#F1F5F9] hover:border-[#1E3A8A]/40 dark:hover:border-[#3B82F6]/40 hover:text-[#1E3A8A] dark:hover:text-[#3B82F6] transition-colors cursor-default"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <Separator className="my-4 bg-[#E2E8F0] dark:bg-[#1E293B]" />

                            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#EFF6FF] dark:bg-[#1E3A8A]/15 border border-[#DBEAFE] dark:border-[#1E3A8A]/30">
                                <Quote className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6] flex-shrink-0 mt-0.5" />
                                <p className="text-[12.5px] text-[#1E3A8A] dark:text-[#93C5FD] italic leading-relaxed">
                                    "Advancing knowledge at the intersection of law, society, and governance — for a more just world."
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* AIMS & SCOPE ───────────────────────────────────────── */}
                <Card>
                    <SectionTag>Aims & Scope</SectionTag>
                    <h2
                        className="text-[22px] font-bold text-[#0F172A] dark:text-[#F1F5F9] mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        What We Stand For
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {AIMS.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="flex flex-col gap-3 p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#020617] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#1E3A8A]/30 dark:hover:border-[#3B82F6]/30 hover:-translate-y-0.5 transition-all group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 flex items-center justify-center group-hover:bg-[#1E3A8A] dark:group-hover:bg-[#3B82F6] transition-colors">
                                    <Icon className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6] group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F1F5F9] mb-1">
                                        {title}
                                    </p>
                                    <p className="text-[12px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* STATS GRID ─────────────────────────────────────────── */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {STATS.map(({ icon: Icon, value, label, color }) => (
                        <div
                            key={label}
                            className="bg-white dark:bg-[#0F172A] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] p-4 text-center shadow-[0_1px_8px_rgba(15,23,42,.05)]"
                        >
                            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2.5", color)}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <p className="text-[20px] font-bold text-[#0F172A] dark:text-[#F1F5F9] leading-none">
                                {value}
                            </p>
                            <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1 leading-tight">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* PUBLISHER ──────────────────────────────────────────── */}
                <Card>
                    <SectionTag>Publisher</SectionTag>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2
                                className="text-[22px] font-bold text-[#0F172A] dark:text-[#F1F5F9] mb-4"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Axiara Private Limited
                            </h2>
                            <p className="text-[14px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-4">
                                JIAS is published by <span className="text-[#0F172A] dark:text-[#F1F5F9] font-semibold">Axiara Private Limited</span> —
                                an organization committed to advancing knowledge, research, and innovation across
                                interdisciplinary academia, global governance, and social transformation.
                            </p>
                            <p className="text-[14px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                                The Foundation operates with a mission to democratize access to legal knowledge
                                through open-access publishing, capacity building programs, and collaborative
                                research initiatives across South Asia and beyond.
                            </p>

                            <div className="flex flex-wrap gap-2 mt-5">
                                {["Open Access", "Non-Profit", "Peer-Reviewed", "India Based"].map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-[11px] font-semibold border-[#1E3A8A]/25 text-[#1E3A8A] dark:border-[#3B82F6]/30 dark:text-[#3B82F6] px-2.5"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Contact card */}
                        <div className="bg-[#F8FAFC] dark:bg-[#020617] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] p-5 space-y-4">
                            <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">
                                Contact Details
                            </p>
                            {[
                                { icon: Building2, label: "Organisation", value: "Axiara Private Limited" },
                                { icon: MapPin, label: "Country", value: "India" },
                                { icon: Mail, label: "Email", value: "[EMAIL_ADDRESS]", href: "mailto:[EMAIL_ADDRESS]" },
                                { icon: Globe, label: "Website", value: "www.ijlsg.org", href: "https://www.ijlsg.org" },
                            ].map(({ icon: Icon, label, value, href }) => (
                                <div key={label} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-center shrink-0">
                                        <Icon className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#3B82F6]" />
                                    </div>
                                    <div>
                                        <p className="text-[10.5px] text-[#94A3B8] font-medium">{label}</p>
                                        {href ? (
                                            <Link
                                                href={href}
                                                className="text-[13px] font-semibold text-[#0EA5E9] dark:text-[#22D3EE] hover:underline flex items-center gap-1"
                                            >
                                                {value}
                                                <ExternalLink className="w-3 h-3" />
                                            </Link>
                                        ) : (
                                            <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F1F5F9]">{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* FOUNDERS ───────────────────────────────────────────── */}
                <Card>
                    <SectionTag>Founders</SectionTag>
                    <h2
                        className="text-[22px] font-bold text-[#0F172A] dark:text-[#F1F5F9] mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Visionaries Behind the Journal
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                        {FOUNDERS.map(({ name, role, bio, initials }) => (
                            <div
                                key={name}
                                className="flex flex-col gap-4 p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#020617] border border-[#E2E8F0] dark:border-[#1E293B]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#1E3A8A] to-[#4F46E5] flex items-center justify-center text-white font-bold text-[15px] shrink-0">
                                        {initials}
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-[#0F172A] dark:text-[#F1F5F9]">{name}</p>
                                        <Badge
                                            variant="outline"
                                            className="text-[10px] font-semibold border-[#4F46E5]/25 text-[#4F46E5] dark:border-[#6366F1]/35 dark:text-[#818CF8] px-2 py-0 mt-0.5"
                                        >
                                            {role}
                                        </Badge>
                                    </div>
                                </div>
                                <p className="text-[13px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                                    {bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>


                <EditorialBoard />


                {/* PEER REVIEW PROCESS ────────────────────────────────── */}
                <Card>
                    <SectionTag>Peer Review</SectionTag>
                    <div className="flex items-center justify-between mb-6">
                        <h2
                            className="text-[22px] font-bold text-[#0F172A] dark:text-[#F1F5F9]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Our Review Process
                        </h2>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EFF6FF] dark:bg-[#1E3A8A]/15 border border-[#DBEAFE] dark:border-[#1E3A8A]/30">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#3B82F6]" />
                            <span className="text-[12px] font-semibold text-[#1E3A8A] dark:text-[#3B82F6]">
                                Double-Blind
                            </span>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                        {REVIEW_STEPS.map(({ step, icon: Icon, title, desc }, i) => (
                            <div key={step} className="relative">
                                {/* Connector line */}
                                {i < REVIEW_STEPS.length - 1 && (
                                    <div className="hidden lg:block absolute top-5 left-[calc(100%_-_8px)] w-8 h-px bg-[#E2E8F0] dark:bg-[#1E293B] z-10" />
                                )}
                                <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#020617] border border-[#E2E8F0] dark:border-[#1E293B] h-full">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-[#1E3A8A] to-[#4F46E5] flex items-center justify-center shrink-0">
                                            <Icon className="w-4 h-4 text-white" />
                                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#0EA5E9] flex items-center justify-center">
                                                <span className="text-[8px] font-bold text-white">{step}</span>
                                            </div>
                                        </div>
                                        <p className="text-[13px] font-bold text-[#0F172A] dark:text-[#F1F5F9] leading-snug">
                                            {title}
                                        </p>
                                    </div>
                                    <p className="text-[12px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Ethics note */}
                    <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-[#F0FDF4] dark:bg-[#14532D]/20 border border-[#BBF7D0] dark:border-[#166534]/40">
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                        <p className="text-[12.5px] text-[#166534] dark:text-[#4ADE80] leading-relaxed">
                            <span className="font-bold">Ethics & Integrity:</span> All submissions are screened
                            for plagiarism using industry-standard tools. Authors must declare conflicts of
                            interest and confirm ethical compliance. JIAS follows COPE guidelines strictly.
                        </p>
                    </div>
                </Card>

                {/* CTA STRIP ──────────────────────────────────────────── */}
                <div className="relative rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#4F46E5] to-[#0EA5E9]" />
                    <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                    <div className="relative px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <h3
                                className="text-[22px] sm:text-[26px] font-bold text-white mb-2"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Ready to Submit Your Research?
                            </h3>
                            <p className="text-[14px] text-white/65 max-w-xl">
                                Join hundreds of scholars contributing to JIAS. Our editorial team provides
                                constructive feedback and a transparent review process.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                            <Link href="/submission">
                                <Button className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold text-[13px] rounded-xl px-6 gap-2 shadow-[0_4px_16px_rgba(0,0,0,.2)]">
                                    Submit Manuscript
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/guidelines">
                                <Button
                                    variant="outline"
                                    className="border-white/25 hover:bg-white/10 font-medium text-[13px] rounded-xl px-6 gap-2"
                                >
                                    <Layers className="w-4 h-4" />
                                    Author Guidelines
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}