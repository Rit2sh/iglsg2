"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Field, FieldLabel, FieldContent, FieldError
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { FileUpload } from "@/components/Files/file-upload";
import { User, Mail, Building, FileType, Info } from "lucide-react";
import { z } from "zod";
import { guestSubmissionSchema } from "./submissionSchema";
import Link from "next/link";

export default function GuestSubmissionForm() {
    const form = useForm<z.infer<typeof guestSubmissionSchema>>({
        resolver: zodResolver(guestSubmissionSchema),
        defaultValues: {
            additionalAuthors: "None",
            acceptTerms: false,
        }
    });

    const onSubmit = (values: any) => console.log(values);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">

            {/* --- Section 1: Author(s) Profile --- */}
            <div className="space-y-6">
                <h3 className="text-lg font-bold border-b pb-2">Author Profile</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Field className="md:col-span-1">
                        <FieldLabel>Title*</FieldLabel>
                        <Controller
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        {["Dr.", "Mr.", "Mrs", "Ms."].map(t => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldError errors={[form.formState.errors.title]} />
                    </Field>

                    <Field className="md:col-span-1">
                        <FieldLabel>First Name*</FieldLabel>
                        <Input {...form.register("firstName")} />
                        <FieldError errors={[form.formState.errors.firstName]} />
                    </Field>
                    <Field className="md:col-span-1">
                        <FieldLabel>Middle Name</FieldLabel>
                        <Input {...form.register("middleName")} />
                        <FieldError errors={[form.formState.errors.middleName]} />
                    </Field>
                    <Field className="md:col-span-1">
                        <FieldLabel>Last Name</FieldLabel>
                        <Input {...form.register("lastName")} />
                        <FieldError errors={[form.formState.errors.lastName]} />
                    </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>Email Address*</FieldLabel>
                        <Input type="email" {...form.register("email")} />
                        <FieldError errors={[form.formState.errors.email]} />
                    </Field>
                    <Field>
                        <FieldLabel>Occupation*</FieldLabel>
                        <Controller
                            control={form.control}
                            name="occupation"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger><SelectValue placeholder="Select Occupation" /></SelectTrigger>
                                    <SelectContent>
                                        {["Professor", "Judge", "Associate Professor", "Assistant Professor", "Research Scholar", "Student", "Other"].map(o => (
                                            <SelectItem key={o} value={o}>{o}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldError errors={[form.formState.errors.occupation]} />
                    </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>Mobile Number</FieldLabel>
                        <Input {...form.register("mobileNumber")} />
                        <FieldError errors={[form.formState.errors.mobileNumber]} />
                    </Field>
                    <Field>
                        <FieldLabel>Name of Institute*</FieldLabel>
                        <Input {...form.register("institute")} />
                        <FieldError errors={[form.formState.errors.institute]} />
                    </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>Address</FieldLabel>
                        <Input {...form.register("address")} />
                        <FieldError errors={[form.formState.errors.address]} />
                    </Field>
                    <Field>
                        <FieldLabel>Nationality</FieldLabel>
                        <Input {...form.register("nationality")} />
                        <FieldError errors={[form.formState.errors.nationality]} />
                    </Field>
                </div>


            </div>

            {/* --- Section 2: Manuscript Details --- */}
            <div className="space-y-6 pt-4">
                <h3 className="text-lg font-bold border-b pb-2">Manuscript Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>Manuscript Type*</FieldLabel>
                        <Controller
                            control={form.control}
                            name="manuscriptType"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                                    <SelectContent>
                                        {["Research Article", "Case Commentaries", "Book Review", "Essay", "Blog", "Monograph", "Dissertation", "Thesis"].map(type => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldError errors={[form.formState.errors.manuscriptType]} />
                    </Field>

                    <Field>
                        <FieldLabel>Additional Authors*</FieldLabel>
                        <Controller
                            control={form.control}
                            name="additionalAuthors"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue="None">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {["None", "One", "Two"].map(num => (
                                            <SelectItem key={num} value={num}>{num}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </Field>
                </div>

                <Field>
                    <FieldLabel>Anonymised Manuscript along with abstract*</FieldLabel>
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <Info size={14} /> Only Docx files allowed. Ensure manuscript is anonymised.
                    </div>
                    <Controller
                        control={form.control}
                        name="manuscriptFile"
                        render={({ field }) => (
                            <FileUpload
                                onChange={(file: File | null) => field.onChange(file)}
                                value={field.value}
                            />
                        )}
                    />
                    <FieldError errors={[form.formState.errors.manuscriptFile]} />
                </Field>
            </div>

            {/* --- Section 3: Declarations --- */}
            <div className="bg-muted/30 p-6 rounded-xl space-y-4">
                <div className="flex gap-3 items-start">
                    <Controller
                        control={form.control}
                        name="acceptTerms"
                        render={({ field }) => (
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                        )}
                    />
                    <p className="text-[13px] leading-relaxed text-muted-foreground">
                        I hereby solemnly declare that I have read, understood, and accepted all <Link href="/more/terms-conditions" className="text-blue-600 hover:underline">
                            Terms & Conditions
                        </Link>, and <Link href="/more/privacy-policy" className="text-blue-600 hover:underline">
                            Privacy Policy
                        </Link> of IJLSG. I certify that this manuscript is my
                        original work and complies with all ethical standards.

                    </p>
                </div>
                <FieldError errors={[form.formState.errors.acceptTerms]} />
            </div>

            <Button type="submit" className="w-full bg-[#1E3A8A] h-12 text-lg">
                Submit Manuscript
            </Button>
        </form>
    );
}