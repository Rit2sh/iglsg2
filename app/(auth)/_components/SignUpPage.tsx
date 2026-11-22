"use client";

import { useState, type ComponentPropsWithoutRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

// ── Lucide Icons ─────────────────────────────────────────────────
import {
    Eye,
    EyeOff,
    User,
    Mail,
    Lock,
    KeyRound,
    Newspaper,
    CheckCircle2,
    Circle,
    ArrowRight,
    Loader2,
    ShieldCheck,
    Star,
    AlertCircle,
} from "lucide-react";

// ── shadcn/ui ────────────────────────────────────────────────────
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
    Field,
    FieldLabel,
    FieldContent,
    FieldError,
} from "@/components/ui/field";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/Redux/store";
import { fetchUser } from "@/app/Redux/slice/User.slice";

// ────────────────────────────────────────────────────────────────
//  ZOD SCHEMA
// ────────────────────────────────────────────────────────────────
const registerSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First name is required")
            .min(2, "Must be at least 2 characters")
            .max(50, "Must be under 50 characters")
            .regex(/^[A-Za-z\s'-]+$/, "Contains invalid characters"),

        lastName: z
            .string()
            .min(1, "Last name is required")
            .min(2, "Must be at least 2 characters")
            .max(50, "Must be under 50 characters")
            .regex(/^[A-Za-z\s'-]+$/, "Contains invalid characters"),

        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Must be at least 8 characters")
            .max(64, "Must be under 64 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),

        terms: z
            .boolean()
            .refine((val) => val === true, {
                message: "You must accept the terms to continue",
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
        mode: "onChange",
    });

    const watchedPassword = form.watch("password");

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true);
        try {
            const { data } = await axios.post("/api/auth/signUp", values);
            if (data.success) {
                form.reset();
                toast.success(data.message);
                dispatch(fetchUser());
                router.push("/");
                return;
            } else {
                toast.error(data.message);
            }
        } catch {
            form.setError("root", {
                message: "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    // ── Google OAuth ─────────────────────────────────────────────
    async function handleGoogle() {
        setIsGoogleLoading(true);
        await new Promise((res) => setTimeout(res, 1200)); // ← replace with signIn("google")
        setIsGoogleLoading(false);
    }

    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

            <div
                className="min-h-screen flex bg-[#F8FAFC] dark:bg-[#020617]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
                {/* ── Left panel ── */}
                <LeftPanel />

                {/* ── Right form area ── */}
                <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                    <div className="w-full max-w-[480px]">

                        {/* Mobile brand */}
                        <div className="flex items-center gap-2.5 mb-8 lg:hidden">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#1E3A8A] to-[#4F46E5] flex items-center justify-center">
                                <Newspaper className="w-4 h-4 text-white" />
                            </div>
                            <span
                                className="text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9]"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Newsroom
                            </span>
                        </div>

                        {/* Card */}
                        <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] shadow-[0_4px_32px_rgba(30,58,138,.08)] p-8">

                            {/* Card header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <ShieldCheck className="w-5 h-5 text-[#0EA5E9]" />
                                    <h1
                                        className="text-[25px] font-bold text-[#0F172A] dark:text-[#F1F5F9]"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        Create your account
                                    </h1>
                                </div>
                                <p className="text-[13px] text-[#64748B] dark:text-[#94A3B8] ml-7">
                                    Fill in your details to get started with Newsroom
                                </p>
                            </div>

                            {/* Google OAuth button */}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleGoogle}
                                disabled={isGoogleLoading}
                                className="w-full h-10 rounded-xl border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] hover:bg-[#F8FAFC] dark:hover:bg-[#020617] hover:border-[#0EA5E9] dark:hover:border-[#22D3EE] text-[#0F172A] dark:text-[#F1F5F9] text-[13px] font-medium gap-2.5 transition-all"
                            >
                                {isGoogleLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                )}
                                {isGoogleLoading ? "Redirecting…" : "Continue with Google"}
                            </Button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-5">
                                <Separator className="flex-1 bg-[#E2E8F0] dark:bg-[#1E293B]" />
                                <span className="text-[11.5px] text-[#94A3B8] whitespace-nowrap">
                                    or register with email
                                </span>
                                <Separator className="flex-1 bg-[#E2E8F0] dark:bg-[#1E293B]" />
                            </div>

                            {/* ── React Hook Form ── */}
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                                {/* First + Last name row */}
                                <div className="grid grid-cols-2 gap-3">

                                    {/* First name */}
                                    <Field className="space-y-1.5">
                                        <FieldLabel className={labelCls}>First name</FieldLabel>
                                        <FieldContent>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                                                <Input
                                                    placeholder="Jane"
                                                    className={inputCls}
                                                    {...form.register("firstName")}
                                                />
                                            </div>
                                        </FieldContent>
                                        <FieldError className="text-[11px]" errors={[form.formState.errors.firstName]} />
                                    </Field>

                                    {/* Last name */}
                                    <Field className="space-y-1.5">
                                        <FieldLabel className={labelCls}>Last name</FieldLabel>
                                        <FieldContent>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                                                <Input
                                                    placeholder="Smith"
                                                    className={inputCls}
                                                    {...form.register("lastName")}
                                                />
                                            </div>
                                        </FieldContent>
                                        <FieldError className="text-[11px]" errors={[form.formState.errors.lastName]} />
                                    </Field>
                                </div>

                                {/* Email */}
                                <Field className="space-y-1.5">
                                    <FieldLabel className={labelCls}>Email address</FieldLabel>
                                    <FieldContent>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                                            <Input
                                                type="email"
                                                placeholder="jane@newsroom.com"
                                                className={inputCls}
                                                {...form.register("email")}
                                            />
                                        </div>
                                    </FieldContent>
                                    <FieldError className="text-[11px]" errors={[form.formState.errors.email]} />
                                </Field>

                                {/* Password */}
                                <Field className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <FieldLabel className={labelCls}>Password</FieldLabel>
                                        <span className="text-[11px] text-[#94A3B8]">Min. 8 characters</span>
                                    </div>
                                    <FieldContent>
                                        <PasswordInput
                                            show={showPassword}
                                            onToggle={() => setShowPassword((v) => !v)}
                                            placeholder="Create a strong password"
                                            {...form.register("password")}
                                        />
                                    </FieldContent>
                                    {/* Live strength meter */}
                                    <StrengthMeter password={watchedPassword} />
                                    <FieldError className="text-[11px]" errors={[form.formState.errors.password]} />
                                </Field>

                                {/* Confirm password */}
                                <Field className="space-y-1.5">
                                    <FieldLabel className={labelCls}>Confirm password</FieldLabel>
                                    <FieldContent>
                                        <div className="relative">
                                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                                            <Input
                                                type={showConfirm ? "text" : "password"}
                                                placeholder="Re-enter your password"
                                                className={cn(inputCls, "pr-10")}
                                                {...form.register("confirmPassword")}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm((v) => !v)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0EA5E9] dark:hover:text-[#22D3EE] transition-colors"
                                            >
                                                {showConfirm
                                                    ? <EyeOff className="w-4 h-4" />
                                                    : <Eye className="w-4 h-4" />
                                                }
                                            </button>
                                        </div>
                                    </FieldContent>
                                    <FieldError className="text-[11px]" errors={[form.formState.errors.confirmPassword]} />
                                </Field>

                                {/* Terms & conditions */}
                                <Controller
                                    control={form.control}
                                    name="terms"
                                    render={({ field }) => (
                                        <Field className="space-y-1.5">
                                            <div className="flex items-start gap-2.5">
                                                <FieldContent>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="mt-0.5 border-[#E2E8F0] dark:border-[#1E293B] data-[state=checked]:bg-[#0EA5E9] data-[state=checked]:border-[#0EA5E9]"
                                                    />
                                                </FieldContent>
                                                <FieldLabel className="text-[12.5px] leading-relaxed font-normal text-[#64748B] dark:text-[#94A3B8] cursor-pointer m-0">
                                                    I agree to the{" "}
                                                    <Link
                                                        href="/more/terms-conditions"
                                                        className="text-[#0EA5E9] dark:text-[#22D3EE] font-medium hover:underline"
                                                    >
                                                        Terms of Service
                                                    </Link>{" "}
                                                    and{" "}
                                                    <Link
                                                        href="/more/privacy-policy"
                                                        className="text-[#0EA5E9] dark:text-[#22D3EE] font-medium hover:underline"
                                                    >
                                                        Privacy Policy
                                                    </Link>
                                                </FieldLabel>
                                            </div>
                                            <FieldError className="text-[11px] ml-7" errors={[form.formState.errors.terms]} />
                                        </Field>
                                    )}
                                />

                                {/* Root / server error */}
                                {form.formState.errors.root && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40">
                                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                                        <p className="text-[12.5px] text-red-600 dark:text-red-400">
                                            {form.formState.errors.root.message}
                                        </p>
                                    </div>
                                )}

                                {/* Submit button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className={cn(
                                        "w-full h-10 rounded-xl text-white text-[13.5px] font-semibold tracking-wide gap-2 transition-all",
                                        "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90",
                                        "dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90",
                                        "shadow-[0_4px_14px_rgba(30,58,138,.3)]"
                                    )}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Creating account…
                                        </>
                                    ) : (
                                        <>
                                            Create account
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>

                            </form>

                            {/* Switch to login */}
                            <p className="text-center mt-5 text-[12.5px] text-[#64748B] dark:text-[#94A3B8]">
                                Already have an account?{" "}
                                <Link
                                    href="/signin"
                                    className="text-[#0EA5E9] dark:text-[#22D3EE] font-semibold hover:underline"
                                >
                                    Sign in →
                                </Link>
                            </p>
                        </div>

                        {/* Security note */}
                        <div className="flex items-center justify-center gap-1.5 mt-4">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#94A3B8]" />
                            <p className="text-[11.5px] text-[#94A3B8]">
                                256-bit SSL encryption · Your data is always protected
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}


// ────────────────────────────────────────────────────────────────
//  PASSWORD STRENGTH UTIL
// ────────────────────────────────────────────────────────────────
function getStrength(password: string) {
    const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };
    const score = Object.values(checks).filter(Boolean).length;
    const meta = [
        null,
        { label: "Weak", bar: "bg-red-500", text: "text-red-500" },
        { label: "Fair", bar: "bg-amber-500", text: "text-amber-500" },
        { label: "Good", bar: "bg-[#0EA5E9]", text: "text-[#0EA5E9]" },
        { label: "Strong", bar: "bg-green-500", text: "text-green-500" },
    ];
    return { score, checks, ...(meta[score] ?? {}) };
}

// ────────────────────────────────────────────────────────────────
//  STRENGTH METER COMPONENT
// ────────────────────────────────────────────────────────────────
function StrengthMeter({ password }: { password?: string }) {
    if (!password) return null;
    const { score, label, bar, text, checks } = getStrength(password);

    const rules: { key: keyof typeof checks; label: string }[] = [
        { key: "length", label: "At least 8 characters" },
        { key: "upper", label: "One uppercase letter" },
        { key: "number", label: "One number" },
        { key: "special", label: "One special character" },
    ];

    return (
        <div className="mt-2 space-y-2">
            {/* Bars */}
            <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={cn(
                            "h-1 flex-1 rounded-full transition-all duration-300",
                            i <= score ? bar : "bg-[#E2E8F0] dark:bg-[#1E293B]"
                        )}
                    />
                ))}
            </div>

            {/* Score label */}
            {label && (
                <p className={cn("text-[11px] font-semibold", text)}>
                    Password strength: {label}
                </p>
            )}

            {/* Rule checklist */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {rules.map((r) => (
                    <div key={r.key} className="flex items-center gap-1.5">
                        {checks[r.key] ? (
                            <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
                        ) : (
                            <Circle className="w-3 h-3 text-[#CBD5E1] dark:text-[#334155] shrink-0" />
                        )}
                        <span
                            className={cn(
                                "text-[11px] transition-colors",
                                checks[r.key]
                                    ? "text-[#64748B] dark:text-[#94A3B8]"
                                    : "text-[#94A3B8] dark:text-[#475569]"
                            )}
                        >
                            {r.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ────────────────────────────────────────────────────────────────
//  LEFT DECORATIVE PANEL
// ────────────────────────────────────────────────────────────────
function LeftPanel() {
    return (
        <div className="hidden lg:flex flex-col justify-between w-[400px] shrink-0 relative overflow-hidden bg-[#1E3A8A] dark:bg-[#0F172A] p-12">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -left-14 w-72 h-72 rounded-full bg-[#4F46E5] opacity-40 blur-[60px]" />
                <div className="absolute bottom-10 -right-10 w-60 h-60 rounded-full bg-[#0EA5E9] opacity-35 blur-[55px]" />
                <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-[#4F46E5] opacity-20 blur-[40px]" />
            </div>

            {/* Brand */}
            <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
                    <Newspaper className="w-5 h-5 text-white" />
                </div>
                <Link href={'/'}
                    className="text-xl font-bold text-white tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    JIAS
                </Link>
            </div>

            {/* Copy block */}
            <div className="relative space-y-5">
                <Badge className="bg-white/15 hover:bg-white/20 text-white border-0 text-[11px] font-medium px-3 py-1 gap-1.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    Trusted by 50,000+ journalists
                </Badge>

                <h2
                    className="text-[32px] font-bold text-white leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Start breaking<br />stories today.
                </h2>

                <p className="text-[13.5px] text-white/65 leading-relaxed">
                    Join thousands of reporters, editors, and publishers who rely on
                    JIAS for real-time collaboration and publishing.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                    {["Real-time editing", "Secure publishing", "Team collaboration"].map((f) => (
                        <span
                            key={f}
                            className="flex items-center gap-1.5 text-[11px] font-medium text-white/75 bg-white/10 border border-white/15 rounded-full px-3 py-1"
                        >
                            <CheckCircle2 className="w-3 h-3 text-[#0EA5E9]" />
                            {f}
                        </span>
                    ))}
                </div>
            </div>

            {/* Testimonial card */}
            <div className="relative bg-white/10 border border-white/15 rounded-2xl p-5 space-y-3">
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                </div>
                <p className="text-[13px] text-white/80 leading-relaxed">
                    {'"'} JIAS transformed how our team collaborates on breaking stories —
                    it{"'"}s simply indispensable. {'"'}
                </p>
                <div className="flex items-center gap-3 pt-1">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#0EA5E9] to-[#4F46E5] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                        SC
                    </div>
                    <div>
                        <p className="text-[12.5px] font-semibold text-white">Sarah Chen</p>
                        <p className="text-[11px] text-white/50">Senior Editor, The Daily Post</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


// ────────────────────────────────────────────────────────────────
//  REUSABLE PASSWORD INPUT
// ────────────────────────────────────────────────────────────────
function PasswordInput(
    { show, onToggle, ...props }: { show: boolean; onToggle: () => void } & ComponentPropsWithoutRef<typeof Input>
) {
    return (
        <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
            <Input
                type={show ? "text" : "password"}
                className={cn(
                    "pl-9 pr-10 h-10 rounded-xl text-[13.5px]",
                    "bg-[#F8FAFC] dark:bg-[#020617]",
                    "border-[#E2E8F0] dark:border-[#1E293B]",
                    "text-[#0F172A] dark:text-[#F1F5F9]",
                    "placeholder:text-[#94A3B8]",
                    "focus-visible:ring-[#0EA5E9] focus-visible:ring-2 focus-visible:ring-offset-0",
                    "focus-visible:border-[#0EA5E9]"
                )}
                {...props}
            />
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0EA5E9] dark:hover:text-[#22D3EE] transition-colors"
            >
                {show
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                }
            </button>
        </div>
    );
}

// ────────────────────────────────────────────────────────────────
//  INPUT CLASS HELPER
// ────────────────────────────────────────────────────────────────
const inputCls = cn(
    "pl-9 h-10 rounded-xl text-[13.5px]",
    "bg-[#F8FAFC] dark:bg-[#020617]",
    "border-[#E2E8F0] dark:border-[#1E293B]",
    "text-[#0F172A] dark:text-[#F1F5F9]",
    "placeholder:text-[#94A3B8]",
    "focus-visible:ring-[#0EA5E9] focus-visible:ring-2 focus-visible:ring-offset-0",
    "focus-visible:border-[#0EA5E9]"
);

const labelCls = "text-[12.5px] font-medium text-[#0F172A] dark:text-[#F1F5F9]";
