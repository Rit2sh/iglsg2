"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Send,
    Settings,
    ShieldCheck,
    Archive,
    Newspaper,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const SidebarLINKS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Submissions", href: "/dashboard/submissions", icon: Send },
    { label: "Review Queue", href: "/dashboard/review-queue", icon: BookOpen },
    { label: "Archives & Volumes", href: "/dashboard/archives", icon: Archive },
];

export default function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/signOut", { method: "POST" });
        } finally {
            router.push("/signin");
            router.refresh();
        }
    };

    const NavContent = ({ mobile = false }) => (
        <div className="flex flex-col h-full py-6">
            {/* Brand Header */}
            {!isCollapsed || mobile ? (
                <div className="px-6 mb-10">
                    <h2 className="text-2xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                        JIAS <span className="text-[10px] uppercase tracking-tighter text-muted-foreground block">Management Hub</span>
                    </h2>
                </div>
            ) : (
                <div className="flex justify-center mb-10">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">J</div>
                </div>
            )}

            {/* Primary Links */}
            <nav className="flex-1 px-3 space-y-1">
                {SidebarLINKS.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href}>
                            <div className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                isCollapsed && !mobile && "justify-center px-0"
                            )}>
                                <Icon size={20} className={cn("shrink-0", isActive ? "text-white" : "text-muted-foreground/70 group-hover:text-primary")} />
                                {(!isCollapsed || mobile) && <span>{link.label}</span>}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className={cn("px-3 space-y-1 pt-6 border-t border-border", isCollapsed && !mobile && "flex flex-col items-center")}>
                <Link href="/dashboard/profile">
                    <div className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted transition-all",
                        isCollapsed && !mobile && "justify-center px-0 w-full"
                    )}>
                        <Settings size={20} />
                        {(!isCollapsed || mobile) && <span>Account Profile</span>}
                    </div>
                </Link>
                <button
                    onClick={handleLogout}
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer w-full text-left",
                        isCollapsed && !mobile && "justify-center px-0"
                    )}
                >
                    <LogOut size={20} />
                    {(!isCollapsed || mobile) && <span>Logout</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Trigger */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" className="rounded-full h-14 w-14 shadow-2xl">
                            <Menu size={24} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72">
                        <NavContent mobile />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside className={cn(
                "hidden lg:flex flex-col border-r bg-white dark:bg-slate-950 transition-all duration-300 sticky top-0 h-screen",
                isCollapsed ? "w-20" : "w-72"
            )}>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-20 bg-white border border-border rounded-full h-6 w-6 z-50 hover:bg-primary hover:text-white"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </Button>
                <NavContent />
            </aside>
        </>
    );
}