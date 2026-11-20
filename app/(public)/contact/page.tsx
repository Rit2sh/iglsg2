"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- Icons ---
import {
    Mail,
    User,
    MessageSquare,
    Send,
    Loader2,
    MapPin,
    Phone,
    Globe,
    Clock,
    HelpCircle
} from "lucide-react";

// --- shadcn/ui & Custom ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldError
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

// --- Zod Schema ---
const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message is too short"),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ContactValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: "", email: "", subject: "", message: "" },
    });

    async function onSubmit(values: ContactValues) {
        setIsLoading(true);
        try {
            console.log("Contact Data:", values);
            await new Promise(res => setTimeout(res, 1500));
            toast.success("Message sent! We will get back to you shortly.");
            form.reset();
        } catch (error) {
            toast.error("Failed to send message.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Get in Touch
                    </h1>
                    <p className="text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto text-lg">
                        Have questions about manuscript submission, peer review, or subscriptions?
                        Our editorial office is here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Left Side: Contact Information */}
                    <div className="lg:col-span-1 space-y-8">
                        <section className="space-y-6">
                            <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9]">Editorial Office</h3>

                            <div className="space-y-4">
                                <ContactInfoItem
                                    icon={<MapPin className="text-[#0EA5E9]" size={20} />}
                                    title="Address"
                                    detail="Academic Plaza, 4th Floor, Science District, NY 10001"
                                />
                                <ContactInfoItem
                                    icon={<Mail className="text-[#0EA5E9]" size={20} />}
                                    title="Email"
                                    detail="editorial@ijlsg.com"
                                />
                                <ContactInfoItem
                                    icon={<Phone className="text-[#0EA5E9]" size={20} />}
                                    title="Phone"
                                    detail="+1 (555) 123-4567"
                                />
                                <ContactInfoItem
                                    icon={<Clock className="text-[#0EA5E9]" size={20} />}
                                    title="Office Hours"
                                    detail="Mon - Fri, 9:00 AM - 6:00 PM EST"
                                />
                            </div>
                        </section>

                        <Separator className="bg-[#E2E8F0] dark:bg-[#1E293B]" />

                        <div className="p-6 bg-white dark:bg-[#0F172A] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <HelpCircle className="text-[#0EA5E9]" size={20} />
                                <h4 className="font-bold">Quick Help</h4>
                            </div>
                            <p className="text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-4">
                                Looking for author guidelines or ethics policies?
                            </p>
                            <Button variant="link" className="p-0 h-auto text-[#0EA5E9] font-semibold" asChild>
                                <Link href="/more/author-guidelines">Visit Resource Center →</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] p-8 md:p-10 shadow-[0_4px_32px_rgba(30,58,138,.04)]">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <Field className="space-y-1.5">
                                    <FieldLabel className={labelCls}>Full Name</FieldLabel>
                                    <FieldContent>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                            <Input placeholder="John Doe" className={cn(inputCls, "pl-10")} {...form.register("name")} />
                                        </div>
                                    </FieldContent>
                                    <FieldError className="text-[11px]" errors={[form.formState.errors.name]} />
                                </Field>

                                {/* Email */}
                                <Field className="space-y-1.5">
                                    <FieldLabel className={labelCls}>Email Address</FieldLabel>
                                    <FieldContent>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                            <Input placeholder="john@example.com" className={cn(inputCls, "pl-10")} {...form.register("email")} />
                                        </div>
                                    </FieldContent>
                                    <FieldError className="text-[11px]" errors={[form.formState.errors.email]} />
                                </Field>
                            </div>

                            {/* Subject */}
                            <Field className="space-y-1.5">
                                <FieldLabel className={labelCls}>Subject</FieldLabel>
                                <FieldContent>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                        <Input placeholder="Manuscript Inquiry" className={cn(inputCls, "pl-10")} {...form.register("subject")} />
                                    </div>
                                </FieldContent>
                                <FieldError className="text-[11px]" errors={[form.formState.errors.subject]} />
                            </Field>

                            {/* Message */}
                            <Field className="space-y-1.5">
                                <FieldLabel className={labelCls}>Message</FieldLabel>
                                <FieldContent>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#94A3B8]" />
                                        <Textarea
                                            placeholder="Tell us how we can help..."
                                            className={cn(inputCls, "pl-10 min-h-[160px] py-3 resize-none")}
                                            {...form.register("message")}
                                        />
                                    </div>
                                </FieldContent>
                                <FieldError className="text-[11px]" errors={[form.formState.errors.message]} />
                            </Field>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "w-full h-12 rounded-xl text-white text-[15px] font-semibold gap-2 transition-all",
                                    "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90 shadow-md"
                                )}
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={18} />}
                                {isLoading ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
}

// --- Helper Components ---
function ContactInfoItem({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1">{icon}</div>
            <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">{title}</p>
                <p className="text-[#0F172A] dark:text-[#F1F5F9] font-medium leading-tight mt-1">{detail}</p>
            </div>
        </div>
    );
}

// --- Styles (Identical to Login) ---
const inputCls = cn(
    "rounded-xl text-[13.5px]",
    "bg-[#F8FAFC] dark:bg-[#020617]",
    "border-[#E2E8F0] dark:border-[#1E293B]",
    "text-[#0F172A] dark:text-[#F1F5F9]",
    "placeholder:text-[#94A3B8]",
    "focus-visible:ring-[#0EA5E9] focus-visible:ring-2 focus-visible:ring-offset-0"
);

const labelCls = "text-[12.5px] font-medium text-[#0F172A] dark:text-[#F1F5F9]";