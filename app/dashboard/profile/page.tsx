// app/dashboard/profile/page.tsx
"use client";

import React, { useState } from "react";
import {
    User, Mail, MapPin, GraduationCap,
    Globe,
    Camera, Save, Edit3, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaLinkedin } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const dummyProfile = {
    firstName: "Arjun",
    middleName: "K.",
    lastName: "Sharma",
    email: "a.sharma@university-law.edu.in",
    avatar: "",
    role: "Editor-in-Chief",
    education: "Ph.D. in Constitutional Law, National Law School",
    address: "Sector 14, National Law University Campus, New Delhi, India",
    bio: "Senior legal scholar specializing in digital governance and constitutional frameworks. Serving on the JIAS board since 2024.",
    socials: {
        website: "https://arjunsharma.law",
        linkedin: "linkedin.com/in/arjunsharma",
        twitter: "@arjun_law"
    },
    verified: true
};

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(dummyProfile);

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
            {/* Header / Cover Area */}
            <div className="relative h-48 rounded-3xl bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute bottom-6 right-6 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none rounded-xl gap-2"
                >
                    {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
                    {isEditing ? "Save Profile" : "Edit Profile"}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-20 px-4 md:px-8">
                {/* Left Column: Avatar & Basic Info */}
                <div className="space-y-6">
                    <Card className="border-none shadow-xl rounded-3xl overflow-hidden pt-10">
                        <CardContent className="flex flex-col items-center text-center space-y-4 pb-8">
                            <div className="relative group">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
                                    <AvatarImage src={profile.avatar} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                                        {profile.firstName[0]}{profile.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {profile.firstName} {profile.middleName} {profile.lastName}
                                </h2>
                                <Badge variant="secondary" className="mt-1 bg-blue-50 text-[#1E3A8A] border-none px-3">
                                    {profile.role}
                                </Badge>
                            </div>

                            {profile.verified && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    <ShieldCheck size={14} /> Verified Board Member
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Social Connections */}
                    <Card className="border-none shadow-sm rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Social Presence</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-600">
                                <Globe size={18} />
                                {isEditing ? <Input defaultValue={profile.socials.website} className="h-8 text-xs" /> : <span className="text-sm truncate">{profile.socials.website}</span>}
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <FaLinkedin size={18} />
                                {isEditing ? <Input defaultValue={profile.socials.linkedin} className="h-8 text-xs" /> : <span className="text-sm truncate">{profile.socials.linkedin}</span>}
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <BsTwitter size={18} />
                                {isEditing ? <Input defaultValue={profile.socials.twitter} className="h-8 text-xs" /> : <span className="text-sm truncate">{profile.socials.twitter}</span>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Detailed Info & Bio */}
                <div className="lg:col-span-2 space-y-6 pt-20 lg:pt-0">
                    <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b pb-4 px-8">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-slate-500">
                                <User size={16} /> Personal & Academic Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            {/* Names Group */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <ProfileField label="First Name" value={profile.firstName} isEditing={isEditing} />
                                <ProfileField label="Middle Name" value={profile.middleName} isEditing={isEditing} />
                                <ProfileField label="Last Name" value={profile.lastName} isEditing={isEditing} />
                            </div>

                            {/* Email & Education */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProfileField label="Email Address" value={profile.email} icon={<Mail size={14} />} isEditing={isEditing} disabled={true} />
                                <ProfileField label="Education / Credentials" value={profile.education} icon={<GraduationCap size={14} />} isEditing={isEditing} />
                            </div>

                            {/* Address */}
                            <ProfileField label="Institutional Address" value={profile.address} icon={<MapPin size={14} />} isEditing={isEditing} />

                            {/* Bio */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Professional Bio</label>
                                {isEditing ? (
                                    <Textarea defaultValue={profile.bio} className="min-h-[120px] rounded-xl border-slate-200" />
                                ) : (
                                    <p className="text-slate-600 leading-relaxed text-sm">{profile.bio}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-4 bg-amber-50 border border-dashed border-amber-200 rounded-2xl flex gap-3">
                        <ShieldCheck className="text-amber-600 shrink-0 mt-1" size={18} />
                        <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                            <strong>Note:</strong> Changes to your official institutional email or role require verification by the Editor-in-Chief to maintain ISSN compliance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileField({ label, value, isEditing, icon, disabled }: { label: string, value: string, isEditing: boolean, icon?: any, disabled?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                {icon} {label}
            </label>
            {isEditing ? (
                <Input defaultValue={value} disabled={disabled} className="rounded-xl border-slate-200 bg-white shadow-sm" />
            ) : (
                <p className="text-sm font-semibold text-slate-700">{value || "—"}</p>
            )}
        </div>
    );
}