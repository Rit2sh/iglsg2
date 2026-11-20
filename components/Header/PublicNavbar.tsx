"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    ChevronDown, ShieldCheck, Scale, Copyright,
    Search,
    Menu,
    Mail,
    Phone,
    BookOpen,
    LogIn,
    UserPlus,
    X,
    Home,
    Info,
    BookMarked,
    Users,
    FileText,
    Send,
    Globe,
    ChevronRight,
    LayoutDashboard,
    LucideIcon,
    Archive,
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
import Image from "next/image";

// ── Nav link definitions ──────────────────────────────────────────
const NAV_LINKS = [
    { label: "Home", href: "/", icon: Home },
    { label: "Current Issue", href: "/issue", icon: BookMarked },
    { label: "Archives", href: "/archives", icon: Archive },
    { label: "Editorial Board", href: "/editorial-board", icon: Users },
    { label: "Guidelines", href: "/guidelines", icon: FileText },
    { label: "Submission", href: "/submission", icon: Send },
    // { label: "More", href: "/more", icon: Globe },
];

const ABOUT_SUB_LINKS = [
    { label: "About IJLSG", href: "/about", icon: Info },
];
const MORE_SUB_LINKS = [
    { label: "Terms & Conditions", href: "/more/terms-conditions", icon: FileText },
    { label: "Privacy Policy", href: "/more/privacy-policy", icon: ShieldCheck },
    { label: "Ethical Policy", href: "/more/ethics", icon: Scale },
    { label: "Copyright Policy", href: "/more/copyright", icon: Copyright },
];
export function PublicNavbar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const { user, loading } = useAuth();

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
                            <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105 group-active:scale-95 ">
                                <Image src="/Clogo.png" alt="Logo" width={100} height={100} className='w-full h-full object-contain' />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-foreground leading-tight tracking-tight text-sm md:text-base transition-colors group-hover:text-primary">
                                    <span className="hidden lg:inline">
                                        <Image src="/Hlogo.png" alt="Logo" width={150} height={24} className='w-full h-full object-contain' />
                                    </span>
                                </span>

                            </div>
                        </Link>

                        {/* Desktop Links (lg+) */}
                        <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-center ">
                            <DesktopNavLink href="/" label="Home" />

                            {/* About Dropdown */}
                            <AboutDropdown />

                            {NAV_LINKS.filter(link => link.label !== "Home").map((link) => (
                                <DesktopNavLink key={link.href} href={link.href} label={link.label} />
                            ))}
                            <MoreDropdown />
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

                            {user && !loading ? (
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
                                    {user?.role !== "ADMIN" && user?.role !== "USER" && (
                                        <Link href="/dashboard" className="hidden md:flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-95">Dashboard</Link>
                                    )}
                                </>
                            ) : (
                                <div className="hidden sm:flex items-center gap-2">
                                    <Link
                                        href="/signin"
                                        className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full text-foreground hover:bg-muted transition-colors active:scale-95"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Log In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-95"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        Sign Up
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Hamburger Menu */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <button
                                        aria-label="Open menu"
                                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 text-foreground hover:bg-muted transition-colors active:scale-95"
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

                                        {/* Mobile Auth Area */}
                                        <div className="space-y-3 pb-6">
                                            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest px-2">Account Access</p>
                                            {user && !loading ? (
                                                <SheetClose asChild>
                                                    <Link
                                                        href="/dashboard"
                                                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-[14px] font-bold text-primary-foreground bg-primary transition-all shadow-lg shadow-primary/25 active:scale-[0.98]"
                                                    >
                                                        <UserPlus className="w-5 h-5" />
                                                        Dashboard
                                                    </Link>
                                                </SheetClose>
                                            ) : (
                                                <>
                                                    <SheetClose asChild>
                                                        <Link
                                                            href="/signin"
                                                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-[14px] font-bold text-foreground bg-muted hover:bg-muted/80 transition-all border border-border/50 active:scale-[0.98]"
                                                        >
                                                            <LogIn className="w-5 h-5" />
                                                            Sign In Securely
                                                        </Link>
                                                    </SheetClose>
                                                    <SheetClose asChild>
                                                        <Link
                                                            href="/signup"
                                                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-[14px] font-bold text-primary-foreground bg-primary transition-all shadow-lg shadow-primary/25 active:scale-[0.98]"
                                                        >
                                                            <UserPlus className="w-5 h-5" />
                                                            Create Free Account
                                                        </Link>
                                                    </SheetClose>
                                                </>
                                            )}

                                        </div>
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

                    <div className="hidden md:flex xl:hidden items-center justify-center gap-2 pb-3 overflow-x-auto scrollbar-none border-t border-border/40 pt-3">
                        <DesktopNavLink href="/" label="Home" />

                        {/* About Dropdown */}
                        <AboutDropdown />

                        {NAV_LINKS.filter(link => link.label !== "Home").map((link) => (
                            <DesktopNavLink key={link.href} href={link.href} label={link.label} />
                        ))}
                        <MoreDropdown />

                    </div>

                </div>
            </nav >
            {
                loading && (<PreLoader />)
            }
        </header >
    );
}


function AboutDropdown() {
    const pathname = usePathname();
    const isAboutActive = pathname.startsWith("/about");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "flex items-center gap-1 text-sm font-semibold transition-all duration-300 px-3 py-1.5 rounded-full outline-none cursor-pointer",
                        isAboutActive
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                >
                    About
                    <ChevronDown size={14} className={cn("transition-transform duration-200")} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                className="w-56 mt-2 p-2 rounded-xl bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#1E293B] shadow-xl animate-in fade-in slide-in-from-top-2"
            >
                {ABOUT_SUB_LINKS.map((sub) => (
                    <DropdownMenuItem key={sub.href} asChild>
                        <Link
                            href={sub.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 cursor-pointer transition-colors"
                        >
                            <sub.icon size={16} className="text-[#0EA5E9]" />
                            {sub.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
function MoreDropdown() {
    const pathname = usePathname();
    const isMoreActive = pathname.startsWith("/more");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "flex items-center gap-1 text-sm font-semibold transition-all duration-300 px-3 py-1.5 rounded-full outline-none cursor-pointer",
                        isMoreActive
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                >
                    More
                    <ChevronDown size={14} className={cn("transition-transform duration-200")} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                className="w-56 mt-2 p-2 rounded-xl bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#1E293B] shadow-xl animate-in fade-in slide-in-from-top-2"
            >
                {MORE_SUB_LINKS.map((sub) => (
                    <DropdownMenuItem key={sub.href} asChild>
                        <Link
                            href={sub.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 cursor-pointer transition-colors"
                        >
                            <sub.icon size={16} className="text-[#0EA5E9]" />
                            {sub.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
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
            {/* Standard Link */}
            <MobileNavLink href="/" label="Home" Icon={Home} />

            {/* About Accordion */}
            <MobileCollapsibleSection
                label="About"
                icon={Info}
                links={ABOUT_SUB_LINKS}
                isActive={pathname.startsWith("/about")}
            />

            {/* Other Direct Links */}
            {NAV_LINKS.filter(link => !["Home", "About", "More"].includes(link.label)).map(({ href, label, icon: Icon }) => (
                <MobileNavLink key={href} href={href} label={label} Icon={Icon} />
            ))}

            {/* More Accordion */}
            <MobileCollapsibleSection
                label="More"
                icon={Globe}
                links={MORE_SUB_LINKS}
                isActive={pathname.startsWith("/more")}
            />
        </nav>
    );
}

function MobileCollapsibleSection({
    label,
    icon: Icon,
    links,
    isActive
}: {
    label: string;
    icon: any;
    links: any[];
    isActive: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full"
        >
            <CollapsibleTrigger asChild>
                <button
                    className={cn(
                        "flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                        isActive || isOpen
                            ? "bg-primary/5 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Icon size={18} className={cn(isActive || isOpen ? "text-primary" : "text-muted-foreground/70")} />
                        {label}
                    </div>
                    <ChevronDown
                        size={16}
                        className={cn("transition-transform duration-300", isOpen && "rotate-180")}
                    />
                </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-1 mt-1 ml-4 border-l-2 border-muted pl-2 animate-in slide-in-from-top-2 duration-300">
                {links.map((sub) => (
                    <Link
                        key={sub.href}
                        href={sub.href}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                    >
                        <sub.icon size={14} className="text-[#0EA5E9]" />
                        {sub.label}
                    </Link>
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
}

