"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    FileText,
    Tag,
    Layers,
    SendHorizontal,
    Loader2,
    Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldError
} from "@/components/ui/field";
import { FileUpload } from "@/components/Files/file-upload";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AuthPopUp } from "@/components/Auth/AuthPopUp";
import { useAuth } from "@/hooks/useAuth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArticleCategory } from "@/lib/Constants";
import axios from "axios";
import { submitArticle } from "../actions";

const submissionSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters long"),
    abstract: z.string().min(50, "Abstract must be at least 50 characters"),
    keywords: z.string().min(1, "Please provide at least one keyword"),
    category: z.string().min(1, "Category is required"),
    manuscript: z.custom<File>((val) => val instanceof File, "Manuscript file is required"),
});

type SubmissionValues = z.infer<typeof submissionSchema>;

export default function ArticleSubmissionForm() {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SubmissionValues>({
        resolver: zodResolver(submissionSchema),
        defaultValues: {
            title: "",
            abstract: "",
            keywords: "",
            category: "",
        },
        mode: "onChange",
    });

    async function onSubmit(values: SubmissionValues) {
        const { title, abstract, keywords, category, manuscript } = values;
        setIsLoading(true);
        try {
            const data = await submitArticle({ title, abstract, keywords, category, file: manuscript })
            if (data?.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Submission failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    const { user } = useAuth();
    if (!user) {
        return (<AuthPopUp />);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Article Title */}
            <Field className="space-y-1.5">
                <FieldLabel className={labelCls}>Article Title <span className="text-destructive">*</span></FieldLabel>
                <FieldContent>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                        <Input
                            placeholder="e.g. Impact of AI on Modern Journalism"
                            className={cn(inputCls, "pl-10 h-11")}
                            {...form.register("title")}
                        />
                    </div>
                </FieldContent>
                <FieldError className="text-[11px]" errors={[form.formState.errors.title]} />
            </Field>

            {/* Category & Keywords Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field className="space-y-1.5">
                    <FieldLabel className={labelCls}>Category</FieldLabel>
                    <FieldContent>
                        <Controller
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <div className="relative">
                                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none z-10" />
                                        <SelectTrigger className={cn(inputCls, "pl-10 h-10 w-full text-left font-normal")}>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </div>
                                    <SelectContent className="bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#1E293B]">
                                        {Object.entries(ArticleCategory).map(([key, value]) => (
                                            <SelectItem
                                                key={key}
                                                value={key} // Stores the KEY (e.g., SCIENCE) in DB
                                                className="text-[13.5px] focus:bg-[#F8FAFC] dark:focus:bg-[#020617] cursor-pointer"
                                            >
                                                {value} {/* Displays the Label (e.g., Science) */}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FieldContent>
                    <FieldError className="text-[11px]" errors={[form.formState.errors.category]} />
                </Field>

                <Field className="space-y-1.5">
                    <FieldLabel className={labelCls}>Keywords</FieldLabel>
                    <FieldContent>
                        <div className="relative">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                            <Input
                                placeholder="Comma separated"
                                className={cn(inputCls, "pl-10")}
                                {...form.register("keywords")}
                            />
                        </div>
                    </FieldContent>
                    <FieldError className="text-[11px]" errors={[form.formState.errors.keywords]} />
                </Field>
            </div>

            {/* Abstract */}
            <Field className="space-y-1.5">
                <FieldLabel className={labelCls}>Abstract <span className="text-destructive">*</span></FieldLabel>
                <FieldContent>
                    <Textarea
                        placeholder="Provide a brief summary of your research..."
                        className={cn(inputCls, "min-h-[140px] py-3 px-4 resize-none")}
                        {...form.register("abstract")}
                    />
                </FieldContent>
                <FieldError className="text-[11px]" errors={[form.formState.errors.abstract]} />
            </Field>

            {/* Manuscript Upload using Controller */}
            <Field className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <FieldLabel className={labelCls}>Manuscript File</FieldLabel>
                    <div className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
                        <Info size={12} />
                        DOCX accepted
                    </div>
                </div>
                <FieldContent>
                    <Controller
                        control={form.control}
                        name="manuscript"
                        render={({ field }) => (
                            <FileUpload
                                onChange={(file: File | null) => field.onChange(file)}
                                value={field.value}
                            />
                        )}
                    />
                </FieldContent>
                <FieldError className="text-[11px]" errors={[form.formState.errors.manuscript]} />
            </Field>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                    "w-full h-11 mt-4 rounded-xl text-white text-[14px] font-semibold gap-2 transition-all",
                    "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90",
                    "shadow-[0_4px_14px_rgba(30,58,138,.25)]"
                )}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        Submit Manuscript
                        <SendHorizontal className="w-4 h-4" />
                    </>
                )}
            </Button>
        </form>
    );
}

// --- Styles to match your LoginPage ---
const inputCls = cn(
    "rounded-xl text-[13.5px]",
    "bg-white dark:bg-[#020617]",
    "border-[#E2E8F0] dark:border-[#1E293B]",
    "text-[#0F172A] dark:text-[#F1F5F9]",
    "placeholder:text-[#94A3B8]",
    "focus-visible:ring-[#0EA5E9] focus-visible:ring-2 focus-visible:ring-offset-0"
);

const labelCls = "text-[12.5px] font-medium text-[#0F172A] dark:text-[#F1F5F9]";