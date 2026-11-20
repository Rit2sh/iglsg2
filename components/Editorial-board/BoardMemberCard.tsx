"use client";

import { cn } from "@/lib/utils";
import { Mail, Globe, BookOpen, Quote, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FaLinkedin } from 'react-icons/fa';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type BoardMember = {
    id?: string;
    name: string;
    role: string;
    designation?: string;
    institution?: string;
    bio?: string;
    expertise?: string[];
    image?: string;
    badge?: string;
    country?: string;
    email?: string;
    social?: {
        linkedin?: string;
        googleScholar?: string;
    };
    stats?: {
        publications?: number;
        citations?: number;
    };
};

const roleStyles: Record<string, { pill: string; dot: string }> = {
    "editor-in-chief": {
        pill: "bg-violet-100 text-violet-700 border-violet-200",
        dot: "bg-violet-400",
    },
    "associate editor": {
        pill: "bg-emerald-100 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-400",
    },
    reviewer: {
        pill: "bg-amber-100 text-amber-700 border-amber-200",
        dot: "bg-amber-400",
    },
    "advisory board": {
        pill: "bg-pink-100 text-pink-700 border-pink-200",
        dot: "bg-pink-400",
    },
    default: {
        pill: "bg-blue-100 text-blue-700 border-blue-200",
        dot: "bg-blue-400",
    },
};

function getRoleStyle(role: string) {
    const lower = role.toLowerCase();
    for (const key of Object.keys(roleStyles)) {
        if (lower.includes(key)) return roleStyles[key];
    }
    return roleStyles.default;
}

function getInitials(name: string) {
    const clean = name.replace(/^(Dr|Prof|Mr|Ms|Mrs)\.?\s*/i, "").trim();
    const parts = clean.split(" ");
    return parts.length >= 2
        ? parts[0][0] + parts[parts.length - 1][0]
        : parts[0]?.[0] ?? "?";
}

export default function BoardMemberCard({
    member,
    className,
}: {
    member: BoardMember;
    className?: string;
}) {
    const roleStyle = getRoleStyle(member.role);

    return (
        <Card
            className={cn(
                "group relative rounded-2xl border border-slate-100 bg-white shadow-none",
                "hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow duration-200",
                "dark:bg-slate-900 dark:border-slate-800 w-80 cursor-pointer h-[60vh]",
                className
            )}
        >
                {/* Colored top accent bar */}
                <div className={cn("absolute top-0 left-6 right-6 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-200", roleStyle.dot)} />

                <CardContent className="p-6 flex flex-col gap-4">

                    {/* Avatar + Name + Role */}
                    <div className="flex items-center gap-4">
                        <Avatar className="w-14 h-14 border border-slate-100 dark:border-slate-700 shrink-0">
                            <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                            <AvatarFallback className="bg-violet-50 text-violet-600 font-semibold text-sm dark:bg-violet-950 dark:text-violet-300">
                                {getInitials(member.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-semibold text-slate-900 dark:text-slate-100 leading-snug truncate">
                                <Link href={`/editorial-board/${member?.id}`} className="focus:outline-none">
                                    <span className="absolute inset-0 z-0" aria-hidden="true" />
                                    {member.name}
                                </Link>
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                <Badge
                                    variant="outline"
                                    className={cn("text-[11px] font-semibold px-2.5 py-0.5 rounded-full border", roleStyle.pill)}
                                >
                                    {member.role}
                                </Badge>
                                {member.badge && (
                                    <Badge
                                        variant="outline"
                                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                                    >
                                        {member.badge}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Designation + Institution */}
                    {(member.designation || member.institution) && (
                        <div className="space-y-0.5">
                            {member.designation && (
                                <p className="text-[13px] font-medium text-slate-700 dark:text-slate-300">
                                    {member.designation}
                                </p>
                            )}
                            {member.institution && (
                                <p className="text-[12px] text-slate-400 dark:text-slate-500">
                                    {member.institution}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Country */}
                    {member.country && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-slate-300 dark:text-slate-600" />
                            <span className="text-[12px] text-slate-400 dark:text-slate-500">
                                {member.country}
                            </span>
                        </div>
                    )}

                    {/* Bio */}
                    {member.bio && (
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                            {member.bio}
                        </p>
                    )}

                    {/* Expertise tags */}
                    {member.expertise && member.expertise.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {member.expertise.map((exp, i) => (
                                <span
                                    key={i}
                                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                                >
                                    {exp}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Divider + Stats + Socials */}
                    {(member.stats || member.email || member.social?.linkedin || member.social?.googleScholar) && (
                        <div className="bottom-2 absolute w-full">
                            <Separator className="bg-slate-100 dark:bg-slate-800 " />
                            <div className="flex items-center justify-between gap-2 ">

                                {/* Stats */}
                                {member.stats && (
                                    <div className="flex items-center gap-3">
                                        {member.stats.publications && (
                                            <div className="flex items-center gap-1.5">
                                                <BookOpen size={12} className="text-slate-300 dark:text-slate-600" />
                                                <span className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">
                                                    {member.stats.publications.toLocaleString()}
                                                </span>
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500">pubs</span>
                                            </div>
                                        )}
                                        {member.stats.citations && (
                                            <div className="flex items-center gap-1.5">
                                                <Quote size={12} className="text-slate-300 dark:text-slate-600" />
                                                <span className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">
                                                    {member.stats.citations.toLocaleString()}
                                                </span>
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500">cites</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Social icons */}
                                <div className="flex items-center gap-2 ml-auto">
                                    {member.email && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link href={`mailto:${member.email}`}
                                                    className="relative z-10 p-1.5 rounded-lg text-slate-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors"
                                                >
                                                    <Mail size={14} />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="text-xs">
                                                Send email
                                            </TooltipContent>
                                        </Tooltip>
                                    )}

                                    {member.social?.linkedin && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>

                                                <Link href={member.social.linkedin}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="relative z-10 p-1.5 rounded-lg text-slate-300 hover:text-[#0077B5] hover:bg-sky-50 dark:hover:bg-sky-950 dark:hover:text-sky-400 transition-colors"
                                                >
                                                    <FaLinkedin size={14} />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="text-xs">
                                                LinkedIn
                                            </TooltipContent>
                                        </Tooltip>
                                    )}

                                    {member.social?.googleScholar && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>

                                                <Link href={member.social.googleScholar}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="relative z-10 p-1.5 rounded-lg text-slate-300 hover:text-[#4285F4] hover:bg-blue-50 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors"
                                                >
                                                    <Globe size={14} />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="text-xs">
                                                Google Scholar
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
    );
}