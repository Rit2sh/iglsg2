import {
    Mail, GraduationCap, Building, Globe, ExternalLink,
    Award, BookOpen, Quote, ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BOARD_MEMBERS } from "@/Data/EditorialBoard";
import Link from "next/link";

export default async function EditorialMemberProfile({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const member = BOARD_MEMBERS.find((m) => m.id === resolvedParams.id);
    if (!member) {
        return (
            <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-[#0F172A] dark:text-[#F1F5F9]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Member Not Found
                        </h1>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] py-16 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Top Section: Hero Info */}
                <div className="flex flex-col md:flex-row gap-10 items-start mb-12">
                    <div className="relative">
                        <div className="w-48 h-60 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl relative z-10">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#0EA5E9]/10 rounded-full blur-3xl z-0" />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                            <Badge className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]">
                                {member.role}
                            </Badge>
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 uppercase tracking-widest">
                                <ShieldCheck size={14} /> Verified Board Member
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-[#0F172A] dark:text-[#F1F5F9]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {member.name}
                        </h1>

                        <div className="space-y-2">
                            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
                                {member.designation}
                            </p>
                            <div className="flex items-center gap-2 text-slate-500">
                                <Building size={18} />
                                <span>{member.institution}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm font-semibold text-[#0EA5E9] hover:underline">
                                <Mail size={16} /> {member.email}
                            </Link>
                            <Link href={member.institutionalProfile || ""} target="_blank" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary">
                                <Globe size={16} /> Institutional Profile <ExternalLink size={14} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Stats & Expertise */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <Award size={16} /> Impact Metrics
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                    <BookOpen className="mx-auto mb-2 text-[#1E3A8A]" size={20} />
                                    <p className="text-2xl font-bold">{member.stats.publications}</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Publications</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                    <Quote className="mx-auto mb-2 text-[#0EA5E9]" size={20} />
                                    <p className="text-2xl font-bold">{member.stats.citations.toLocaleString()}</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Citations</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Areas of Expertise</h3>
                            <div className="flex flex-wrap gap-2">
                                {member.expertise?.map((item: string) => (
                                    <Badge key={item} variant="outline" className="px-3 py-1 text-slate-600 border-slate-200">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Bio & Education */}
                    <div className="lg:col-span-2 space-y-10">
                        <section className="space-y-4">
                            <h3 className="text-2xl font-bold italic" style={{ fontFamily: "'Playfair Display', serif" }}>Biography</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                {member.bio}
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <GraduationCap className="text-[#0EA5E9]" /> Educational Background
                            </h3>
                            <div className="space-y-6 border-l-2 border-slate-200 dark:border-slate-800 ml-3 pl-8">
                                {member.education?.map((edu: any) => (
                                    <div key={edu.year} className="relative">
                                        <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-[#0EA5E9]" />
                                        <p className="text-sm font-bold text-[#0EA5E9]">{edu.year}</p>
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                                        <p className="text-slate-500 font-medium">{edu.school}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}