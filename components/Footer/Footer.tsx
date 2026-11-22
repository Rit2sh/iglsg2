import Link from "next/link";
import {
    BookOpen,
    Mail,
    Globe,
    MapPin,
    ArrowUpRight,
    Send,
    ShieldCheck,
    FileText,
    Users,
    BookMarked,
    Archive,
    Phone,
    Newspaper,
    ExternalLink,
    ChevronRight,
    CreditCard,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CCLicenseBadge from "./CCLicenseBadge";

// ── Types ─────────────────────────────────────────────────────────
interface FooterLink {
    label: string;
    href: string;
    icon?: React.ElementType;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

interface IndexBadge {
    name: string;
    color: string;
}

// ── Data ──────────────────────────────────────────────────────────
const FOOTER_SECTIONS: FooterSection[] = [
    {
        title: "Journal",
        links: [
            { label: "About the Journal", href: "/about", icon: BookOpen },
            { label: "Current Issue", href: "/current-issue", icon: BookMarked },
            { label: "Archives", href: "/archives", icon: Archive },
            { label: "Other Publications", href: "/publications", icon: Newspaper },
        ],
    },
    {
        title: "For Authors",
        links: [
            { label: "Submit Manuscript", href: "/submission", icon: Send },
            { label: "Publication Fees & Payment", href: "/payment", icon: CreditCard },
            { label: "Author Guidelines", href: "/guidelines", icon: FileText },
            { label: "Review & Ethics", href: "/more/ethics", icon: ShieldCheck },
            { label: "Editorial Board", href: "/editorial-board", icon: Users },
        ],
    },
    {
        title: "Information",
        links: [
            { label: "Contact Us", href: "/contact", icon: Phone },
            { label: "Join Mailing List", href: "/subscribe", icon: Mail },
            { label: "Privacy Policy", href: "/more/privacy-policy", icon: FileText },
            { label: "Terms of Use", href: "/more/terms-conditions", icon: FileText },
        ],
    },
];

const INDEX_BADGES: IndexBadge[] = [
    { name: "Google Scholar", color: "bg-blue-50   dark:bg-blue-950/40   text-blue-700   dark:text-blue-300   border-blue-100   dark:border-blue-900/50" },
    { name: "DOAJ", color: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/50" },
    { name: "CrossRef", color: "bg-sky-50    dark:bg-sky-950/40    text-sky-700    dark:text-sky-300    border-sky-100    dark:border-sky-900/50" },
    { name: "Index Copernicus", color: "bg-teal-50   dark:bg-teal-950/40   text-teal-700   dark:text-teal-300   border-teal-100   dark:border-teal-900/50" },
];

// ── Sub-components ────────────────────────────────────────────────
function FooterLinkItem({ label, href, icon: Icon }: FooterLink & { icon?: React.ElementType }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 text-[12.5px] text-white/55 hover:text-white group transition-colors duration-150"
        >
            {Icon && (
                <Icon className="w-3.5 h-3.5 text-white/30 group-hover:text-[#0EA5E9] shrink-0 transition-colors" />
            )}
            <span>{label}</span>
            <ChevronRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#0EA5E9]" />
        </Link>
    );
}

// ─────────────────────────────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────────────────────────────
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="bg-[#0C1C3D] dark:bg-[#020617] border-t border-white/10 text-white"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >

            {/* ── NEWSLETTER STRIP ─────────────────────────────────── */}
            <div className="border-b border-white/10 bg-[#1E3A8A]/60 dark:bg-[#1E3A8A]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4 text-[#7DD3FC]" />
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold text-white">Stay up to date</p>
                            <p className="text-[11.5px] text-white/55">
                                Get notified when new issues and articles are published
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/subscribe"
                        className={cn(
                            "flex items-center gap-2 px-5 py-2 rounded-xl text-[12.5px] font-semibold transition-all shrink-0",
                            "bg-[#0EA5E9] hover:bg-[#0EA5E9]/85 text-white",
                            "shadow-[0_2px_12px_rgba(14,165,233,.4)]"
                        )}
                    >
                        <Send className="w-3.5 h-3.5" />
                        Join Mailing List
                    </Link>
                </div>
            </div>

            {/* ── MAIN FOOTER BODY ─────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

                    {/* Brand column — spans 2 cols on lg */}
                    <div className="sm:col-span-2 space-y-5">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition-colors shrink-0">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p
                                    className="text-[15px] font-bold text-white leading-tight"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    IJLSG
                                </p>
                                <p className="text-[10.5px] text-white/45 font-medium">
                                    Law & Social Governance
                                </p>
                            </div>
                        </Link>

                        {/* Description */}
                        <p className="text-[13px] text-white/55 leading-relaxed max-w-sm">
                            The <span className="text-white/80 font-medium">International Journal of Law and
                                Social Governance</span> is a peer-reviewed, open-access academic journal
                            advancing interdisciplinary research in law, governance, and public policy.
                        </p>

                        {/* Journal details */}
                        <div className="space-y-2">
                            {[
                                { icon: Globe, text: "Open Access · Bi-Annual · Est. 2026" },
                                { icon: MapPin, text: "Published in India" },
                                { icon: Mail, text: "editor@ijlsg.org", href: "mailto:editor@ijlsg.org" },
                                { icon: ShieldCheck, text: "ISSN (Online): XXXX-XXXX" },
                            ].map(({ icon: Icon, text, href }) => (
                                <div key={text} className="flex items-center gap-2">
                                    <Icon className="w-3.5 h-3.5 text-white/30 shrink-0" />
                                    {href ? (
                                        <Link
                                            href={href}
                                            className="text-[12.5px] text-[#7DD3FC] hover:text-white hover:underline transition-colors"
                                        >
                                            {text}
                                        </Link>
                                    ) : (
                                        <span className="text-[12.5px] text-white/50">{text}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Indexed in */}
                        <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2.5">
                                Indexed In
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {INDEX_BADGES.map(({ name, color }) => (
                                    <span
                                        key={name}
                                        className={cn(
                                            "text-[10.5px] font-semibold px-2.5 py-1 rounded-lg border",
                                            color
                                        )}
                                    >
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Link columns */}
                    {FOOTER_SECTIONS.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <p className="text-[11px] font-bold text-white/35 uppercase tracking-widest">
                                {section.title}
                            </p>
                            <ul className="space-y-2.5">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <FooterLinkItem {...link} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            {/* cc license */}
            <CCLicenseBadge />

            {/* ── BOTTOM BAR ───────────────────────────────────────── */}
            <div className="border-t border-white/10 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
                        <p className="text-[12px] text-white/35">
                            © {currentYear} International Journal of Law and Social Governance. All rights reserved.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/more/privacy-policy"
                            className="text-[11.5px] text-white/35 hover:text-white/70 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <div className="w-px h-3 bg-white/15" />
                        <Link
                            href="/more/terms-conditions"
                            className="text-[11.5px] text-white/35 hover:text-white/70 transition-colors"
                        >
                            Terms of Use
                        </Link>
                        <div className="w-px h-3 bg-white/15" />
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                            <span className="text-[11.5px] text-white/35">
                                Published by Axiara Private Limited
                            </span>
                        </div>
                    </div>

                </div>
            </div>

        </footer>
    );
}