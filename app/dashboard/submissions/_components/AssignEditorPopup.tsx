"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    UserPlus,
    ShieldCheck,
    Loader2,
    Info,
    GraduationCap,
    CheckCircle2,
    ShieldAlert,
    BookOpen,
    Mail,
    ArrowRight,
    Users,
    FileText,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { managerApprove, SubmissionDetailsType } from "../action";

// ── Types ─────────────────────────────────────────────────────────
interface AssignEditorProps {
    isOpen: boolean;
    onClose: () => void;
    submission: SubmissionDetailsType;
    editors: any[];
}

// ─────────────────────────────────────────────────────────────────
//  ASSIGN EDITOR POPUP
// ─────────────────────────────────────────────────────────────────
export default function AssignEditorPopup({
    isOpen,
    onClose,
    submission,
    editors,
}: AssignEditorProps) {
    const [selectedEditorId, setSelectedEditorId] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const selectedEditor = editors.find((e) => e.id === selectedEditorId);

    // ── Submit ───────────────────────────────────────────────────
    async function handleFinalApproval() {
        if (!selectedEditorId) {
            toast.error("Please choose a Handling Editor before proceeding.");
            return;
        }
        setIsSubmitting(true);
        if (!submission?.id) {
            toast.error("Submission not found");
            return;
        }
        try {
            const res = await managerApprove({
                submissionId: submission.id,
                editorId: selectedEditorId
            });
            if (res.success) {
                toast.success(res.message);
                router.push("/dashboard/submissions");
                onClose();
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Workflow Error: Could not assign editor. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    // ── Initials helper ──────────────────────────────────────────
    function getInitials(editor: any): string {
        return `${editor?.firstName?.[0] ?? ""}${editor?.lastName?.[0] ?? ""}`.toUpperCase();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className={cn(
                    "sm:max-w-[520px] p-0 overflow-hidden rounded-2xl",
                    "border border-[#E2E8F0] dark:border-[#1E293B]",
                    "shadow-[0_24px_60px_rgba(15,23,42,.18)] dark:shadow-[0_24px_60px_rgba(0,0,0,.5)]",
                    "bg-white dark:bg-[#0F172A]"
                )}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
                {/* ── HEADER ─────────────────────────────────────────── */}
                <div className="relative overflow-hidden bg-linear-to-br from-[#1E3A8A] via-[#1E3A8A] to-[#4F46E5] px-7 pt-7 pb-6">
                    {/* Dot grid */}
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                            backgroundSize: "24px 24px",
                        }}
                    />
                    {/* Glow orb */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#0EA5E9] opacity-15 rounded-full blur-[50px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

                    <div className="relative flex items-start gap-4">
                        {/* Icon */}
                        <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                            <UserPlus className="w-5 h-5 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <DialogTitle
                                    className="text-[17px] font-bold text-white leading-tight"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    Assign Handling Editor
                                </DialogTitle>
                                <Badge className="bg-white/15 hover:bg-white/20 text-white border-0 text-[9.5px] font-bold px-2 py-0.5">
                                    Workflow Step
                                </Badge>
                            </div>
                            <DialogDescription className="text-[12.5px] text-white/60 leading-relaxed">
                                Transitioning{" "}
                                <span className="font-semibold text-white/90 font-mono text-[11.5px] bg-white/10 px-1.5 py-0.5 rounded-md">
                                    {submission?.title
                                        ? submission.title.length > 38
                                            ? submission.title.slice(0, 38) + "…"
                                            : submission.title
                                        : "Manuscript"}
                                </span>{" "}
                                to peer review. Select an editor to oversee the double-blind process.
                            </DialogDescription>
                        </div>
                    </div>

                    {/* Manuscript meta strip */}
                    <div className="relative mt-5 flex flex-wrap gap-2">
                        {[
                            { icon: FileText, label: "Manuscript Under Review" },
                            { icon: Users, label: `${editors?.length ?? 0} Editors Available` },
                            { icon: BookOpen, label: "Double-Blind Process" },
                        ].map(({ icon: Icon, label }) => (
                            <span
                                key={label}
                                className="flex items-center gap-1.5 text-[11px] font-medium text-white/65 bg-white/10 border border-white/15 rounded-full px-2.5 py-1"
                            >
                                <Icon className="w-3 h-3" />
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── BODY ───────────────────────────────────────────── */}
                <div className="px-7 py-6 space-y-5">

                    {/* Editor Select */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">
                            <GraduationCap className="w-3.5 h-3.5" />
                            Available Editorial Board
                        </label>

                        <Select onValueChange={setSelectedEditorId} value={selectedEditorId}>
                            <SelectTrigger
                                className={cn(
                                    "h-11 rounded-xl text-[13px]",
                                    "bg-[#F8FAFC] dark:bg-[#020617]",
                                    "border-[#E2E8F0] dark:border-[#1E293B]",
                                    "text-[#0F172A] dark:text-[#F1F5F9]",
                                    "focus:ring-[#0EA5E9] focus:ring-2 focus:ring-offset-0",
                                    "data-[placeholder]:text-[#94A3B8]",
                                    "transition-all hover:border-[#1E3A8A]/30 dark:hover:border-[#3B82F6]/30"
                                )}
                            >
                                <SelectValue placeholder="Select a subject matter expert…" />
                            </SelectTrigger>

                            <SelectContent
                                className={cn(
                                    "rounded-xl border border-[#E2E8F0] dark:border-[#1E293B]",
                                    "bg-white dark:bg-[#0F172A]",
                                    "shadow-[0_8px_32px_rgba(15,23,42,.12)]",
                                    "p-1.5 max-h-[320px]"
                                )}
                            >
                                {editors?.length === 0 ? (
                                    <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] dark:bg-[#020617] border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-center">
                                            <ShieldAlert className="w-5 h-5 text-[#94A3B8]" />
                                        </div>
                                        <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
                                            No Editors Available
                                        </p>
                                        <p className="text-[11px] text-[#94A3B8]">
                                            Please verify the editorial board status
                                        </p>
                                    </div>
                                ) : (
                                    editors?.map((editor) => (
                                        <SelectItem
                                            key={editor.id}
                                            value={editor.id}
                                            className={cn(
                                                "py-2.5 px-3 rounded-xl cursor-pointer mb-0.5 transition-colors",
                                                "focus:bg-[#EFF6FF] dark:focus:bg-[#1E3A8A]/15",
                                                "data-[state=checked]:bg-[#EFF6FF] dark:data-[state=checked]:bg-[#1E3A8A]/20",
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* Avatar */}
                                                <Avatar className="h-9 w-9 border-2 border-[#E2E8F0] dark:border-[#1E293B] shrink-0">
                                                    <AvatarImage src={editor.avatar || ""} />
                                                    <AvatarFallback className="text-[11px] font-bold bg-linear-to-br from-[#1E3A8A] to-[#4F46E5] text-white">
                                                        {getInitials(editor)}
                                                    </AvatarFallback>
                                                </Avatar>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F1F5F9] truncate">
                                                            {editor.firstName}
                                                            {editor.middleName ? ` ${editor.middleName}` : ""}{" "}
                                                            {editor.lastName}
                                                        </span>
                                                        {editor.emailVerified && (
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <span className="text-[10.5px] font-semibold text-[#1E3A8A] dark:text-[#3B82F6] uppercase tracking-tight">
                                                            {editor.role || "Editorial Member"}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-[#CBD5E1] shrink-0" />
                                                        <span className="text-[10.5px] text-[#94A3B8] truncate max-w-[140px]">
                                                            {editor.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Selected editor preview card */}
                    {selectedEditor && (
                        <div
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
                                "bg-[#EFF6FF] dark:bg-[#1E3A8A]/15",
                                "border-[#DBEAFE] dark:border-[#1E3A8A]/40",
                                "animate-in fade-in slide-in-from-top-2"
                            )}
                        >
                            <Avatar className="h-12 w-12 border-2 border-white dark:border-[#1E293B] shadow-sm shrink-0">
                                <AvatarImage src={selectedEditor.avatar || ""} />
                                <AvatarFallback className="text-[13px] font-bold bg-linear-to-br from-[#1E3A8A] to-[#4F46E5] text-white">
                                    {getInitials(selectedEditor)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <p className="text-[13.5px] font-bold text-[#0F172A] dark:text-[#F1F5F9] truncate">
                                        {selectedEditor.firstName}
                                        {selectedEditor.middleName ? ` ${selectedEditor.middleName}` : ""}{" "}
                                        {selectedEditor.lastName}
                                    </p>
                                    {selectedEditor.emailVerified && (
                                        <Badge className="bg-[#22C55E]/15 text-[#166534] dark:text-[#4ADE80] border-0 text-[9.5px] font-bold px-1.5 py-0">
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Badge className="bg-[#1E3A8A]/10 dark:bg-[#3B82F6]/15 text-[#1E3A8A] dark:text-[#3B82F6] border-0 text-[10px] font-bold px-2 py-0">
                                        {selectedEditor.role || "Editorial Member"}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                    <Mail className="w-3 h-3 text-[#94A3B8]" />
                                    <span className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8] truncate">
                                        {selectedEditor.email}
                                    </span>
                                </div>
                            </div>

                            <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />
                        </div>
                    )}

                    {/* Expertise tags */}
                    {selectedEditor?.expertise?.length > 0 && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            <p className="text-[10.5px] font-bold text-[#94A3B8] uppercase tracking-widest">
                                Matching Expertise
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {selectedEditor.expertise.map((exp: string) => (
                                    <Badge
                                        key={exp}
                                        variant="secondary"
                                        className="bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-[#3B82F6] border-0 text-[11px] font-semibold px-2.5 py-1"
                                    >
                                        {exp}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Policy info box */}
                    <div className={cn(
                        "flex items-start gap-3 p-4 rounded-xl",
                        "bg-[#FFFBEB] dark:bg-[#78350F]/15",
                        "border border-[#FDE68A] dark:border-[#78350F]/40"
                    )}>
                        <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Info className="w-3.5 h-3.5 text-[#D97706]" />
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-[#92400E] dark:text-[#FCD34D] mb-0.5">
                                Peer Review Policy
                            </p>
                            <p className="text-[11.5px] text-[#92400E]/80 dark:text-[#FCD34D]/70 leading-relaxed">
                                The assigned editor is responsible for maintaining the <strong>double-blind</strong> integrity
                                of the review and recruiting at least <strong>three independent reviewers</strong> within
                                the stipulated timeframe.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── FOOTER ─────────────────────────────────────────── */}
                <div className="px-7 py-5 bg-[#F8FAFC] dark:bg-[#020617] border-t border-[#E2E8F0] dark:border-[#1E293B]">

                    {/* Status row */}
                    {selectedEditor && (
                        <div className="flex items-center gap-2 mb-4 animate-in fade-in duration-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
                            <p className="text-[11.5px] text-[#64748B] dark:text-[#94A3B8]">
                                Ready to assign{" "}
                                <span className="font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
                                    {selectedEditor.firstName} {selectedEditor.lastName}
                                </span>{" "}
                                as Handling Editor
                            </p>
                        </div>
                    )}

                    <div className="flex items-center gap-2.5">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className={cn(
                                "shrink-0 h-10 px-5 rounded-xl text-[13px] font-medium",
                                "border-[#E2E8F0] dark:border-[#1E293B]",
                                "text-[#64748B] dark:text-[#94A3B8]",
                                "hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]",
                                "hover:border-[#CBD5E1] dark:hover:border-[#334155]"
                            )}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handleFinalApproval}
                            disabled={isSubmitting || !selectedEditorId}
                            className={cn(
                                "flex-1 h-10 rounded-xl text-[13px] font-semibold gap-2 transition-all",
                                "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90",
                                "text-white shadow-[0_4px_14px_rgba(30,58,138,.35)]",
                                "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
                                "active:scale-[0.98]"
                            )}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Assigning Editor…
                                </>
                            ) : (
                                <>
                                    <ShieldCheck className="w-4 h-4" />
                                    Approve & Assign Editor
                                    {selectedEditor && <ArrowRight className="w-3.5 h-3.5 ml-auto" />}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}