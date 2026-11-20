"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
    Search,
    Menu,
    Mail,
    Phone,
    BookOpen,
    X,
    Users,
    Send,
    LayoutDashboard,
    LucideIcon,
    ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import PreLoader from "../PreLoader";

// ── Nav link definitions ──────────────────────────────────────────
const NAV_LINKS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Editorial Board", href: "/editorial-board", icon: Users },
    { label: "Review Queue", href: "/dashboard/review-queue", icon: BookOpen },
    { label: "Submissions", href: "/dashboard/submissions", icon: Send },
];

export function MemberNavbar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user?.role == "USER") {
            router.push("/");
        }
        else if (user?.role == "ADMIN") {
            router.push("/admin/dashboard");
        }
    }, [user]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
    }, [searchOpen]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSearchOpen(false); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);


    return (
        <header
            className={cn(
                "w-full sticky top-0 z-50 transition-all duration-500 ease-in-out border-b",
                scrolled
                    ? "bg-background/80 backdrop-blur-xl border-border/50 shadow-sm"
                    : "bg-background border-transparent"
            )}
            style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
        >

            {/* ── TOP META BAR ─────────────────────────────────────── */}
            <div className={cn(
                "bg-muted/30 border-b border-border/40 overflow-hidden transition-all duration-500 ease-in-out",
                scrolled ? "h-0 opacity-0 border-transparent" : "h-10 opacity-100"
            )}>
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-full">

                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                            <BookOpen className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase hidden sm:block">
                            Peer-Reviewed • Open Access • Bi-Annual
                        </span>
                        <Badge variant="secondary" className="text-[9px] font-bold px-2 py-0 uppercase sm:hidden bg-primary/10 text-primary border-none">
                            IJLSG
                        </Badge>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <Link href="/contact" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-medium px-2 py-1 rounded-md transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Contact</span>
                        </Link>
                        <div className="w-px h-3 bg-border" />
                        <Link href="/subscribe" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-medium px-2 py-1 rounded-md transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Mailing List</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── EXPANDABLE SEARCH ────────────────────────────────── */}
            <div
                className={cn(
                    "flex justify-center transition-all duration-500 ease-in-out overflow-hidden bg-background origin-top",
                    searchOpen ? "max-h-20 opacity-100 border-b border-border/40 w-full" : "max-h-0 opacity-0 w-full"
                )}
            >
                <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-4">
                    <div className="relative group flex items-center justify-center">
                        <Search className="absolute left-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            ref={searchRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles, authors, volumes, keywords…"
                            className="w-full pl-12 pr-24 h-12 rounded-2xl text-sm bg-muted/40 border-transparent focus-visible:bg-background focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all shadow-inner"
                        />
                        <div className="absolute right-2 flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground/60 hidden sm:block">ESC</span>
                            <button
                                onClick={() => setSearchOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-xl bg-muted hover:bg-muted-foreground/20 transition-colors"
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN NAV BAR ─────────────────────────────────────── */}
            <nav className="relative">
                <div className=" mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16 sm:h-20 transition-all duration-300">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105 group-active:scale-95 ">
                                <BookOpen className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-foreground leading-tight tracking-tight text-sm md:text-base transition-colors group-hover:text-primary">
                                    <span className="hidden lg:inline">International Journal of Law</span>
                                    <span className="lg:hidden">IJLSG</span>
                                </span>
                                <span className="text-muted-foreground text-[10px] md:text-[11px] font-medium tracking-wide">
                                    <span className="hidden lg:inline">and Social Governance</span>
                                    <span className="lg:hidden">Law & Social Governance</span>
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Links (lg+) */}
                        <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center">
                            {NAV_LINKS.map((link) => (
                                <DesktopNavLink key={link.href} href={link.href} label={link.label} />
                            ))}
                        </div>

                        {/* Right Area (Auth, Search Toggle, Mobile Menu) */}
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">

                            <button
                                onClick={() => setSearchOpen((v) => !v)}
                                aria-label="Toggle search"
                                className={cn(
                                    "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                                    searchOpen
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 rotate-90 scale-95"
                                        : "bg-muted/50 text-foreground hover:bg-muted hover:scale-105"
                                )}
                            >
                                {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                            </button>

                            {user && !loading && (
                                <>
                                    <Link
                                        href="/profile"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg grayscale">
                                            <AvatarImage src={user?.avatar ?? `https://avatar.vercel.sh/${user?.firstName} ${user?.lastName}?rounded=60`} alt={`${user?.firstName} ${user?.lastName}`} />
                                            <AvatarFallback className="rounded-lg">
                                                {user?.firstName && user.firstName.length > 0 ?
                                                    user.firstName.charAt(0).toUpperCase() :
                                                    user?.email.charAt(0).toUpperCase() || "U"
                                                }
                                            </AvatarFallback>
                                        </Avatar>
                                    </Link>
                                </>
                            )}

                            {/* Mobile Hamburger Menu */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <button
                                        aria-label="Open menu"
                                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 text-foreground hover:bg-muted transition-colors active:scale-95"
                                    >
                                        <Menu className="w-5 h-5" />
                                    </button>
                                </SheetTrigger>

                                <SheetContent
                                    side="right"
                                    className="w-[85vw] sm:w-[380px] p-0 flex flex-col bg-background/95 backdrop-blur-2xl border-l-border/50"
                                >
                                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                                    {/* Mobile Header */}
                                    <div className="p-6 pb-4 flex items-center justify-between shrink-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center shadow-md shadow-primary/20">
                                                <BookOpen className="w-5 h-5 text-primary-foreground" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-extrabold text-foreground leading-tight text-lg">IJLSG</span>
                                                <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">Menu Directory</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scrollable Links Area */}
                                    <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-none space-y-6">

                                        <MobileNavMenu />

                                        <Separator className="bg-border/50" />
                                    </div>

                                    {/* Mobile Footer */}
                                    <div className="p-4 bg-muted/30 border-t border-border/50 shrink-0 flex justify-center">
                                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                                            © {new Date().getFullYear()} Journal of Law
                                        </p>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    {/* Sub-nav row for md-lg (Hidden perfectly normally, shown if lacking width) */}
                    <div className="hidden md:flex lg:hidden items-center gap-2 pb-3 overflow-x-auto scrollbar-none border-t border-border/40 pt-3">
                        <DesktopNavLink href="/" label="Home" />
                        {NAV_LINKS.map((link) => (
                            <DesktopNavLink key={link.href} href={link.href} label={link.label} />
                        ))}

                    </div>

                </div>
            </nav>
            {
                loading && (<PreLoader />)
            }
        </header>
    );
}


// Keep your existing DesktopNavLink for single links
function DesktopNavLink({ href, label }: { href: string; label: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "relative text-sm font-semibold transition-all duration-300 px-3 py-1.5 rounded-full shrink-0",
                isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
        >
            {label}
        </Link>
    );
}
function MobileNavLink({ href, label, Icon }: { href: string; label: string; Icon: LucideIcon }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <SheetClose asChild>
            <Link
                href={href}
                className={cn(
                    "group flex items-center gap-3 px-3 py-3 rounded-2xl text-[14px] font-medium transition-all duration-200",
                    isActive
                        ? "bg-primary/10 text-primary shadow-inner"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
            >
                <div
                    className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                        isActive
                            ? "bg-primary shadow-lg shadow-primary/25"
                            : "bg-background border border-border/50 group-hover:border-border group-hover:shadow-sm"
                    )}
                >
                    <Icon
                        className={cn(
                            "w-4 h-4",
                            isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )}
                    />
                </div>
                {label}
                {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto text-primary" />
                )}
            </Link>
        </SheetClose>
    );
}

function MobileNavMenu() {
    const pathname = usePathname();

    return (
        <nav className="space-y-2 flex flex-col p-4">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <MobileNavLink key={href} href={href} label={label} Icon={Icon} />
            ))}
        </nav>
    );
}

