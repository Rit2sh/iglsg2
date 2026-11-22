// app/profile/_components/ProfileSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    User, Shield, Activity, Settings, FileText, ClipboardCheck,
    Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "Profile Overview", href: "/profile", icon: User },
    { title: "My Submissions", href: "/profile/article", icon: FileText },
    { title: "Review Queue", href: "/profile/reviews", icon: ClipboardCheck },
    { title: "Security & Devices", href: "/profile/security", icon: Shield },
    { title: "Activity Logs", href: "/profile/activity", icon: Activity },
    { title: "Account Settings", href: "/profile/settings", icon: Settings },
];

export default function ProfileSidebar({ isMobile }: { isMobile?: boolean }) {
    const pathname = usePathname();

    return (
        <aside className={cn(
            "flex flex-col justify-between p-6 transition-all duration-300",
            !isMobile && "w-72 bg-white/70 backdrop-blur-xl dark:bg-slate-950/70 border-r border-border h-screen sticky top-0 shadow-sm",
            isMobile && "h-full bg-background"
        )}>
            <div>
                {/* Logo - Hidden on mobile because it's in the sticky header */}
                {!isMobile && (
                    <h2 className="text-2xl font-bold tracking-tight mb-10 text-primary"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        JIAS
                    </h2>
                )}

                <nav className="space-y-1.5 flex flex-col mt-5">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform outline-none",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:translate-x-1"
                                )}>
                                    <Icon size={18} />
                                    {item.title}
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="pt-6 border-t border-border/50">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-4">
                    Journal Systems
                </p>
            </div>
        </aside>
    );
}