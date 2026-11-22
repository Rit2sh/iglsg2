"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProfileSidebar from "./ProfileSidebar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function MobileProfileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                JIAS
            </h2>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant={"ghost"} size="icon" className="hover:bg-muted rounded-xl transition-colors ">
                        <Menu size={20} className="text-foreground" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72 border-r-0">
                    <ProfileSidebar isMobile />
                </SheetContent>
            </Sheet>
        </div>
    );
}