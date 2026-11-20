"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- UI Components ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// --- Icons ---
import {
    User as UserIcon, Globe, Building, Phone,
    MapPin, Save, Loader2, ShieldCheck, Mail, CheckCircle2, AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { GetUserDataResponseType } from "../actions";
import { cn } from "@/lib/utils";

// --- Schema ---
const profileSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(2, "Last name is required"),
    title: z.enum(["MR", "MS", "MRS", "DR", "OTHER", "PROF"]),
    email: z.string().email(),
    mobileNumber: z.string().regex(/^\d+$/, "Must be digits only").min(10, "Min 10 digits"),
    occupation: z.string().min(1, "Occupation is required"),
    institute: z.string().min(1, "Institute name is required"),
    nationality: z.string().min(1, "Nationality is required"),
    address: z.string().min(5, "Full address is required"),
    gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileDataSetting({ user }: { user: GetUserDataResponseType }) {
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            middleName: user?.middleName || "",
            lastName: user?.lastName || "",
            title: (user?.title as any) || "MR",
            email: user?.email || "",
            mobileNumber: user?.mobileNumber || "",
            occupation: user?.occupation || "",
            institute: user?.institute || "",
            nationality: user?.nationality || "",
            address: user?.address || "",
            gender: (user?.gender as any) || "Male",
        }
    });

    useEffect(() => {
        if (user) {
            form.reset({
                ...user,
                middleName: user.middleName || "",
                title: (user.title as any) || "MR",
                gender: (user.gender as any) || "Male",
            } as ProfileFormValues);
        }
    }, [user, form]);

    async function onSubmit(values: ProfileFormValues) {
        setIsSaving(true);
        try {
            const res = await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!res.ok) throw new Error("Update failed");
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            {/* SECTION 1: IDENTITY */}
            <Card className="overflow-hidden border-border/60 shadow-md">
                <CardHeader className="bg-muted/30 border-b border-border/40 pb-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="relative group">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                                <AvatarImage src={user?.avatar || undefined} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {user?.firstName?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <CardTitle className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Personal Identity
                            </CardTitle>
                            <CardDescription className="text-base">
                                Academic credentials and legal name as used in official publications.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Title - Span 3 */}
                        <Field className="md:col-span-3">
                            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title*</FieldLabel>
                            <Controller
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="h-11 rounded-xl shadow-sm transition-all focus:ring-primary/20">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {["MR", "MS", "MRS", "DR", "PROF", "OTHER"].map(t => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FieldError errors={[form.formState.errors.title]} />
                        </Field>

                        {/* First Name - Span 9 */}
                        <Field className="md:col-span-9">
                            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">First Name*</FieldLabel>
                            <FieldContent>
                                <div className="relative">
                                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                                    <Input className="h-11 pl-11 rounded-xl shadow-sm focus-visible:ring-primary/20" placeholder="Jane" {...form.register("firstName")} />
                                </div>
                            </FieldContent>
                            <FieldError errors={[form.formState.errors.firstName]} />
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Middle Name</FieldLabel>
                            <Input className="h-11 rounded-xl shadow-sm focus-visible:ring-primary/20" placeholder="Optional" {...form.register("middleName")} />
                        </Field>
                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Name*</FieldLabel>
                            <Input className="h-11 rounded-xl shadow-sm focus-visible:ring-primary/20" placeholder="Doe" {...form.register("lastName")} />
                            <FieldError errors={[form.formState.errors.lastName]} />
                        </Field>
                    </div>

                    <Separator className="bg-border/40" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field>
                            <div className="flex items-center justify-between mb-1.5">
                                <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</FieldLabel>
                                {user.emailVerified ? (
                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] gap-1 px-2">
                                        <CheckCircle2 size={10} /> Verified
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] gap-1 px-2">
                                        <AlertCircle size={10} /> Unverified
                                    </Badge>
                                )}
                            </div>
                            <FieldContent>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                                    <Input
                                        className="h-11 pl-11 rounded-xl bg-muted/40 cursor-not-allowed border-dashed opacity-80"
                                        {...form.register("email")}
                                        disabled
                                    />
                                </div>
                            </FieldContent>
                            <p className="text-[10px] text-muted-foreground mt-1.5">Email cannot be changed directly. Please contact support for assistance.</p>
                        </Field>

                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gender</FieldLabel>
                            <Controller
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="h-11 rounded-xl shadow-sm"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {["Male", "Female", "Other", "Prefer not to say"].map(g => (
                                                <SelectItem key={g} value={g}>{g}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </Field>
                    </div>
                </CardContent>
            </Card>

            {/* SECTION 2: PROFESSIONAL */}
            <Card className="border-border/60 shadow-md">
                <CardHeader className="bg-muted/30 border-b border-border/40">
                    <CardTitle className="text-lg flex items-center gap-2 font-bold italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <Building className="w-5 h-5 text-[#0EA5E9]" /> Professional Affiliation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-8">
                    <Field>
                        <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name of Institute*</FieldLabel>
                        <div className="relative">
                            <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                            <Input className="h-11 pl-11 rounded-xl shadow-sm focus-visible:ring-primary/20" placeholder="University/Organization Name" {...form.register("institute")} />
                        </div>
                        <FieldError errors={[form.formState.errors.institute]} />
                    </Field>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Occupation*</FieldLabel>
                            <Controller
                                control={form.control}
                                name="occupation"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="h-11 rounded-xl shadow-sm"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {["Professor", "Judge", "Research Scholar", "Student", "Other"].map(o => (
                                                <SelectItem key={o} value={o}>{o}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FieldError errors={[form.formState.errors.occupation]} />
                        </Field>

                        <Field>
                            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mobile Contact*</FieldLabel>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                                <Input className="h-11 pl-11 rounded-xl shadow-sm focus-visible:ring-primary/20" placeholder="Digits only" {...form.register("mobileNumber")} />
                            </div>
                            <FieldError errors={[form.formState.errors.mobileNumber]} />
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Field className="md:col-span-1">
                            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nationality*</FieldLabel>
                            <div className="relative">
                                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                                <Input className="h-11 pl-11 rounded-xl shadow-sm focus-visible:ring-primary/20" placeholder="E.g. Indian" {...form.register("nationality")} />
                            </div>
                            <FieldError errors={[form.formState.errors.nationality]} />
                        </Field>

                        <Field className="md:col-span-2">
                            <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Correspondence Address*</FieldLabel>
                            <div className="relative">
                                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                                <Input className="h-11 pl-11 rounded-xl shadow-sm focus-visible:ring-primary/20" placeholder="Street, City, State, ZIP" {...form.register("address")} />
                            </div>
                            <FieldError errors={[form.formState.errors.address]} />
                        </Field>
                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 px-1">
                <div className="flex items-start gap-3 text-xs text-muted-foreground/80 max-w-md">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p>Submissions to the <strong>International Journal of Law and Social Governance</strong> require high data accuracy. Please ensure all details match your institutional records.</p>
                </div>
                <Button
                    type="submit"
                    disabled={isSaving}
                    className={cn(
                        "w-full md:w-[220px] h-12 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95",
                        "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 dark:bg-primary dark:hover:bg-primary/90"
                    )}
                >
                    {isSaving ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <Save className="mr-2 h-5 w-5" />}
                    {isSaving ? "Finalizing Update..." : "Update Credentials"}
                </Button>
            </div>
        </form>
    );
}