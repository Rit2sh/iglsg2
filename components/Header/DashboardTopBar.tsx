"use client";

import {
    Search,
    Bell,
    HelpCircle,
    User,
    LogOut,
    Settings,
    ShieldCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardTopBar() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user?.role == "USER") {
            router.push("/");
        }
        else if (user?.role == "ADMIN") {
            router.push("/admin/dashboard");
        }
    }, [user]);
    return (
        <header className="h-16 border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">

            {/* 1. Functional Search Bar [cite: 101-102, 314] */}
            <div className="flex-1 max-w-md relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                    className="pl-10 bg-muted/40 border-none h-10 rounded-xl text-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                    placeholder="Search DOI, Manuscripts, or EB Members..."
                />
            </div>

            {/* 2. Minimum Essential Links & Actions */}
            <div className="flex items-center gap-2 md:gap-4">

                {/* Compliance Badge [cite: 314-316] */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Editorial Secure Access</span>
                </div>

                {/* Notifications Hub */}
                <Button variant="ghost" size="icon" className="relative hover:bg-muted rounded-xl">
                    <Bell size={20} className="text-slate-600" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </Button>

                <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                {/* User Account Menu [cite: 130, 135] */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-3 px-2 hover:bg-muted rounded-xl transition-all">
                            <Avatar className="h-8 w-8 border-2 border-primary/10">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                    {user?.firstName?.charAt(0) || "E"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:flex flex-col items-start text-left">
                                <p className="text-xs font-bold leading-none">{user?.firstName} {user?.lastName}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-semibold mt-1 tracking-tighter">
                                    {user?.role || "Editor"}
                                </p>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl mt-2">
                        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase font-bold px-2 py-1.5">
                            Editorial Identity
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push("/dashboard/profile")} className="rounded-lg gap-2 cursor-pointer py-2">
                            <User size={16} /> My Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/dashboard/settings")} className="rounded-lg gap-2 cursor-pointer py-2">
                            <Settings size={16} /> Preferences
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer py-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950">
                            <LogOut size={16} /> Logout Hub
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}