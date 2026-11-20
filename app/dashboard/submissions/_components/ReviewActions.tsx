"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AssignEditorPopup from "./AssignEditorPopup";
import { SubmissionDetailsType, EditorType } from "../action";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ReviewActionsProps {
    submission: SubmissionDetailsType;
    editors: any[];
}

export default function ReviewActions({ submission, editors }: ReviewActionsProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);

    const handleReject = async () => {
        setIsRejecting(true);
        try {
            // Logic: PATCH /api/submissions/[id]/status -> REJECTED
            toast.success("Manuscript rejected and author notified.");
        } catch (error) {
            toast.error("Failed to reject manuscript.");
        } finally {
            setIsRejecting(false);
        }
    };

    return (
        <>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border shadow-sm">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700 font-bold h-11 px-6 rounded-xl"
                        >
                            {isRejecting ? <Loader2 className="animate-spin" /> : <XCircle size={18} />}
                            Reject
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription className="leading-relaxed">
                                This will issue a <strong>desk rejection</strong> for the manuscript. The author will be automatically notified that their submission has been declined prior to peer review. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleReject} disabled={isRejecting}>
                                {isRejecting ? <Loader2 className="animate-spin" /> : <XCircle size={18} />}
                                Reject
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Button
                    className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-blue-900/20 gap-2"
                    onClick={() => setIsPopupOpen(true)}
                >
                    <CheckCircle size={18} />
                    Approve & Assign Editor
                </Button>
            </div>

            {/* The Popup Step */}
            <AssignEditorPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                submission={submission}
                editors={editors}
            />
        </>
    );
}