"use client";
import { BsFillShieldLockFill } from "react-icons/bs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    LogIn,
    UserPlus,
    Newspaper,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";



export function AuthPopUp() {
    const route = useRouter();
    const isOpen = true;
    const onClose = () => {
        route.push("/");
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-2xl">
                <div className="flex flex-col md:flex-row h-full">

                    {/* Left Side: Decorative (Matches your Login Panel) */}
                    <div className="hidden md:flex w-[180px] bg-[#1E3A8A] p-6 flex-col justify-between relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#4F46E5] opacity-40 blur-2xl" />
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-[#0EA5E9] opacity-35 blur-xl" />
                        </div>

                        <div className="relative">
                            <Newspaper className="w-6 h-6 text-white mb-2" />
                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-tight">
                                IJLSG <br /> Publishing
                            </p>
                        </div>

                        <div className="relative space-y-2">
                            <div className="flex items-center gap-1.5 text-[9px] text-white/80">
                                <CheckCircle2 size={10} className="text-[#0EA5E9]" />
                                Peer Reviewed
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] text-white/80">
                                <CheckCircle2 size={10} className="text-[#0EA5E9]" />
                                Secure Portal
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="flex-1 p-8 bg-white dark:bg-[#0F172A]">
                        <DialogHeader className="text-left">
                            <div className="w-12 h-12 rounded-full bg-[#F0F9FF] dark:bg-[#0C4A6E] flex items-center justify-center mb-4">
                                <BsFillShieldLockFill className="w-6 h-6 text-[#0EA5E9]" />
                            </div>
                            <DialogTitle
                                className="text-2xl font-bold text-[#0F172A] dark:text-[#F1F5F9]"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Authentication Required
                            </DialogTitle>
                            <DialogDescription className="text-[#64748B] dark:text-[#94A3B8] text-sm mt-2 leading-relaxed">
                                To maintain the integrity of our peer-review process, users must be logged in to submit manuscripts.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="mt-8 space-y-3">
                            <Button
                                asChild
                                className="w-full h-11 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 dark:bg-[#3B82F6] text-white rounded-xl gap-2 font-semibold shadow-md"
                            >
                                <Link href="/submission/guest">
                                    <UserPlus size={18} />
                                    Continue as Guest
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="w-full h-11 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 dark:bg-[#3B82F6] text-white rounded-xl gap-2 font-semibold shadow-md"
                            >
                                <Link href="/signin">
                                    <LogIn size={18} />
                                    Sign in to Continue
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="w-full h-11 border-[#E2E8F0] dark:border-[#1E293B] hover:bg-[#F8FAFC] dark:hover:bg-[#020617] rounded-xl gap-2 font-medium"
                            >
                                <Link href="/signup">
                                    <UserPlus size={18} />
                                    Create Author Account
                                </Link>
                            </Button>
                        </div>

                        <p className="text-center mt-6 text-[11px] text-[#94A3B8]">
                            By proceeding, you agree to our <a href="/more/terms" className="underline hover:text-primary">Terms of Service</a>.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}