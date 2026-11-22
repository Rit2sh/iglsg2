"use client";

import React, { useState } from "react";
import { Plus, Trash2, Upload, FileText, CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { JOURNALS } from "@/lib/submission/journals";
import { AuthorItem, SubmissionFormData } from "@/lib/submission/types";

interface Step1Props {
    data: SubmissionFormData;
    onChange: (updates: Partial<SubmissionFormData>) => void;
    onNext: () => void;
}

export default function Step1ManuscriptUpload({ data, onChange, onNext }: Step1Props) {
    const [keywordInput, setKeywordInput] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const selectedJournal = JOURNALS[data.journalId] || JOURNALS.j1;
    const authorLimit = selectedJournal.max;

    // Abstract word counter
    const abstractWords = data.abstract.trim() ? data.abstract.trim().split(/\s+/).length : 0;

    const handleAddKeyword = () => {
        const val = keywordInput.trim().replace(/^,+|,+$/g, "");
        if (!val) return;
        if (data.keywords.length >= 6) {
            setErrors((prev) => ({ ...prev, keywords: "Maximum 6 keywords allowed." }));
            return;
        }
        if (!data.keywords.includes(val)) {
            onChange({ keywords: [...data.keywords, val] });
        }
        setKeywordInput("");
        setErrors((prev) => {
            const next = { ...prev };
            delete next.keywords;
            return next;
        });
    };

    const handleRemoveKeyword = (index: number) => {
        onChange({ keywords: data.keywords.filter((_, i) => i !== index) });
    };

    const handleAddAuthor = () => {
        if (data.authors.length >= authorLimit) {
            setErrors((prev) => ({
                ...prev,
                authors: `Selected journal allows a maximum of ${authorLimit} authors.`,
            }));
            return;
        }
        const newAuthor: AuthorItem = {
            id: `author-${Date.now()}`,
            order: data.authors.length + 1,
            name: "",
            email: "",
            designation: "Assistant Professor",
            affiliation: "",
            country: "India",
            isCorresponding: false,
        };
        onChange({ authors: [...data.authors, newAuthor] });
        setErrors((prev) => {
            const next = { ...prev };
            delete next.authors;
            return next;
        });
    };

    const handleRemoveAuthor = (index: number) => {
        if (data.authors.length <= 1) return;
        const filtered = data.authors.filter((_, i) => i !== index).map((a, idx) => ({
            ...a,
            order: idx + 1,
            isCorresponding: idx === 0 ? true : a.isCorresponding,
        }));
        onChange({ authors: filtered });
    };

    const handleAuthorChange = (index: number, field: keyof AuthorItem, value: any) => {
        const updated = [...data.authors];
        if (field === "isCorresponding" && value === true) {
            updated.forEach((a, i) => {
                a.isCorresponding = i === index;
            });
            if (updated[index].email) {
                onChange({ correspondingEmail: updated[index].email });
            }
        } else {
            updated[index] = { ...updated[index], [field]: value };
            if (index === 0 && field === "email" && !data.correspondingEmail) {
                onChange({ correspondingEmail: value });
            }
        }
        onChange({ authors: updated });
    };

    const validate = () => {
        const newErr: Record<string, string> = {};
        if (!data.journalId) newErr.journalId = "Please select a journal.";
        if (!data.category) newErr.category = "Please select a manuscript category.";
        if (!data.title.trim()) newErr.title = "Manuscript title is required.";
        if (!data.abstract.trim()) newErr.abstract = "Abstract is required.";
        else if (abstractWords > 250) newErr.abstract = "Abstract must not exceed 250 words.";
        if (data.keywords.length < 3) newErr.keywords = "Please provide at least 3 keywords.";
        if (!data.researchTheme.trim()) newErr.researchTheme = "Research area/theme is required.";

        if (!data.authors[0]?.name.trim()) newErr.author0 = "First author name is required.";
        if (!data.authors[0]?.affiliation.trim()) newErr.author0Aff = "First author affiliation is required.";
        if (!data.correspondingEmail.trim()) newErr.email = "Corresponding author email is required.";
        if (!data.correspondingMobile.trim()) newErr.mobile = "Corresponding author mobile number is required.";

        if (!data.manuscriptFileName) {
            newErr.manuscriptFile = "Please attach your manuscript document (DOCX or PDF).";
        }

        setErrors(newErr);
        return Object.keys(newErr).length === 0;
    };

    const handleProceed = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onNext();
        }
    };

    return (
        <form onSubmit={handleProceed} className="space-y-6">
            {/* Step header bar */}
            <div className="bg-gradient-to-r from-[#0a3479] to-[#001d51] text-white rounded-xl px-5 py-3.5 shadow-md flex items-center justify-between">
                <span className="font-extrabold text-lg md:text-xl flex items-center gap-2">
                    <span>▤</span> Step 1 of 3: Manuscript, Authors &amp; File Upload
                </span>
                <span className="text-xs bg-[#ffe66b] text-[#061a43] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {selectedJournal.shortName}
                </span>
            </div>

            {/* Section A: Manuscript Details */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950/60 dark:to-indigo-950/60 px-5 py-3 border-b border-blue-200 dark:border-blue-900 flex items-center gap-2 text-[#092d94] dark:text-blue-300 font-extrabold text-base">
                    <span>▤</span> A. Manuscript Details
                </div>
                <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Journal Selection */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Select Journal <span className="text-rose-500">*</span>
                        </label>
                        <select
                            value={data.journalId}
                            onChange={(e) => {
                                const newJ = e.target.value;
                                onChange({ journalId: newJ });
                                // Adjust authors if exceeds new limit
                                const limit = JOURNALS[newJ]?.max || 6;
                                if (data.authors.length > limit) {
                                    onChange({ authors: data.authors.slice(0, limit) });
                                }
                            }}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#0755ad] focus:outline-none"
                        >
                            {Object.values(JOURNALS).map((j) => (
                                <option key={j.id} value={j.id}>
                                    {j.name} (Max {j.max} authors)
                                </option>
                            ))}
                        </select>
                        <p className="text-[12px] text-blue-700 dark:text-blue-400 mt-1.5 flex items-center gap-1 font-medium">
                            <Info className="w-3.5 h-3.5 shrink-0" />
                            {selectedJournal.note}
                        </p>
                    </div>

                    {/* Manuscript Category */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Manuscript Category <span className="text-rose-500">*</span>
                        </label>
                        <select
                            value={data.category}
                            onChange={(e) => onChange({ category: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#0755ad] focus:outline-none"
                        >
                            <option value="Research Article">Original Research Article</option>
                            <option value="Review Article">Comprehensive Review Article</option>
                            <option value="Case Study">Judicial &amp; Case Law Analysis</option>
                            <option value="Legislative Commentary">Legislative &amp; Policy Commentary</option>
                            <option value="Book Review">Academic Book Review</option>
                            <option value="Short Communication">Short Communication / Working Paper</option>
                        </select>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Title of the Manuscript <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => onChange({ title: e.target.value })}
                            placeholder="Enter the complete scholarly title of your research manuscript..."
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#0755ad] focus:outline-none"
                        />
                        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                            <span>Avoid abbreviations and non-standard symbols in title.</span>
                            <span>{data.title.length} characters</span>
                        </div>
                        {errors.title && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.title}</p>}
                    </div>

                    {/* Abstract */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Abstract <span className="text-rose-500">*</span> &nbsp;
                            <span className="text-slate-500 font-normal normal-case">(Structured Summary, Maximum 250 words)</span>
                        </label>
                        <textarea
                            rows={4}
                            value={data.abstract}
                            onChange={(e) => onChange({ abstract: e.target.value })}
                            placeholder="Provide a comprehensive summary detailing background, research question, methodology, findings, and socio-legal implications..."
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-sm leading-relaxed focus:ring-2 focus:ring-[#0755ad] focus:outline-none"
                        />
                        <div className="flex justify-between items-center text-[11px] mt-1">
                            <span className={abstractWords > 250 ? "text-rose-500 font-bold" : "text-slate-500"}>
                                Word count: {abstractWords} / 250 words
                            </span>
                            {abstractWords > 250 && (
                                <span className="text-rose-500 font-semibold">Exceeds 250 words limit.</span>
                            )}
                        </div>
                        {errors.abstract && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.abstract}</p>}
                    </div>

                    {/* Keywords Tag Input */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Keywords <span className="text-rose-500">*</span> &nbsp;
                            <span className="text-slate-500 font-normal normal-case">(3 to 6 scholarly keywords, press Enter or comma)</span>
                        </label>
                        <div className="flex flex-wrap items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg min-h-[44px]">
                            {data.keywords.map((kw, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/60 text-[#092d68] dark:text-blue-200 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full text-xs font-bold"
                                >
                                    {kw}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveKeyword(i)}
                                        className="hover:text-rose-600 transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </span>
                            ))}
                            {data.keywords.length < 6 && (
                                <div className="flex items-center gap-2 flex-1 min-w-[160px]">
                                    <input
                                        type="text"
                                        value={keywordInput}
                                        onChange={(e) => setKeywordInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === ",") {
                                                e.preventDefault();
                                                handleAddKeyword();
                                            }
                                        }}
                                        placeholder={data.keywords.length === 0 ? "Type keyword & press Enter..." : "Add another..."}
                                        className="bg-transparent border-0 text-sm focus:outline-none flex-1 py-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddKeyword}
                                        className="text-xs font-bold bg-[#0755ad] text-white px-2.5 py-1 rounded-md hover:bg-blue-800"
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                        {errors.keywords && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.keywords}</p>}
                    </div>

                    {/* Research Theme */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Research Area / Discipline Theme <span className="text-rose-500">*</span>
                        </label>
                        <select
                            value={data.researchTheme}
                            onChange={(e) => onChange({ researchTheme: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#0755ad] focus:outline-none"
                        >
                            {selectedJournal.disciplines.map((d, i) => (
                                <option key={i} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Section B: Authors & Affiliation */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950/60 dark:to-indigo-950/60 px-5 py-3 border-b border-blue-200 dark:border-blue-900 flex items-center justify-between text-[#092d94] dark:text-blue-300 font-extrabold text-base">
                    <span className="flex items-center gap-2">
                        <span>👥</span> B. Authors &amp; Affiliations
                    </span>
                    <span className="text-xs font-bold bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded-full text-blue-800 dark:text-blue-300">
                        Maximum {authorLimit} Authors Allowed for {selectedJournal.shortName}
                    </span>
                </div>

                <div className="p-5 md:p-6 space-y-4">
                    {data.authors.map((author, index) => (
                        <div
                            key={author.id}
                            className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3 relative transition-all"
                        >
                            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                                <span className="font-bold text-sm text-[#092d68] dark:text-blue-300 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[#092d68] text-white text-xs flex items-center justify-center font-extrabold">
                                        {author.order}
                                    </span>
                                    {index === 0 ? "First / Lead Author" : `Co-Author ${index + 1}`}
                                </span>

                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                                        <input
                                            type="radio"
                                            name="correspondingAuthor"
                                            checked={author.isCorresponding}
                                            onChange={() => handleAuthorChange(index, "isCorresponding", true)}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <span>Corresponding Author</span>
                                    </label>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAuthor(index)}
                                            className="text-rose-500 hover:text-rose-700 p-1"
                                            title="Remove author"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={author.name}
                                        onChange={(e) => handleAuthorChange(index, "name", e.target.value)}
                                        placeholder="e.g. Dr. Rajesh Sharma"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={author.email}
                                        onChange={(e) => handleAuthorChange(index, "email", e.target.value)}
                                        placeholder="scholar@university.edu"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                                        Designation *
                                    </label>
                                    <input
                                        type="text"
                                        value={author.designation}
                                        onChange={(e) => handleAuthorChange(index, "designation", e.target.value)}
                                        placeholder="e.g. Professor / Research Scholar"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                                        Institution / Affiliation *
                                    </label>
                                    <input
                                        type="text"
                                        value={author.affiliation}
                                        onChange={(e) => handleAuthorChange(index, "affiliation", e.target.value)}
                                        placeholder="e.g. National Law University"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {data.authors.length < authorLimit && (
                        <button
                            type="button"
                            onClick={handleAddAuthor}
                            className="w-full py-3 border-2 border-dashed border-[#0755ad] text-[#0755ad] dark:text-blue-400 dark:border-blue-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors text-sm"
                        >
                            <Plus className="w-4 h-4" /> Add Author ({data.authors.length + 1} of {authorLimit})
                        </button>
                    )}
                    {errors.authors && <p className="text-xs text-rose-500 font-semibold">{errors.authors}</p>}

                    {/* Corresponding Author Contact Details */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                            <span>📞</span> Corresponding Author Contact Details
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Corresponding Author Email <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.correspondingEmail}
                                    onChange={(e) => onChange({ correspondingEmail: e.target.value })}
                                    placeholder="editor will send status updates to this email"
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#0755ad] focus:outline-none"
                                />
                                {errors.email && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Corresponding Author Mobile / WhatsApp <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={data.correspondingMobile}
                                    onChange={(e) => onChange({ correspondingMobile: e.target.value })}
                                    placeholder="+91 XXXXX XXXXX"
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#0755ad] focus:outline-none"
                                />
                                {errors.mobile && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.mobile}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section C: Upload Files */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950/60 dark:to-indigo-950/60 px-5 py-3 border-b border-blue-200 dark:border-blue-900 flex items-center gap-2 text-[#092d94] dark:text-blue-300 font-extrabold text-base">
                    <span>📎</span> C. Upload Manuscript Documents
                </div>
                <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Primary Manuscript */}
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 text-center hover:border-blue-500 transition-colors bg-slate-50/50 dark:bg-slate-800/40">
                        <Upload className="w-8 h-8 mx-auto text-[#0755ad] mb-2" />
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                            Full Manuscript Document <span className="text-rose-500">*</span>
                        </p>
                        <p className="text-xs text-slate-500 mb-3">MS Word (.docx) or PDF (.pdf) &bull; Max 20 MB</p>

                        <label className="inline-block cursor-pointer bg-[#092d68] hover:bg-[#001d51] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm">
                            <span>Browse Manuscript File</span>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        onChange({
                                            manuscriptFileName: file.name,
                                            manuscriptFileSize: file.size,
                                            manuscriptFileUrl: URL.createObjectURL(file),
                                        });
                                        setErrors((prev) => {
                                            const next = { ...prev };
                                            delete next.manuscriptFile;
                                            return next;
                                        });
                                    }
                                }}
                            />
                        </label>

                        {data.manuscriptFileName && (
                            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 py-1.5 px-3 rounded-md">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span className="truncate max-w-[200px]">{data.manuscriptFileName}</span>
                            </div>
                        )}
                        {errors.manuscriptFile && (
                            <p className="text-xs text-rose-500 mt-2 font-semibold">{errors.manuscriptFile}</p>
                        )}
                    </div>

                    {/* Supplementary File */}
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 text-center hover:border-blue-500 transition-colors bg-slate-50/50 dark:bg-slate-800/40">
                        <FileText className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                            Cover Letter / Supplementary Files
                        </p>
                        <p className="text-xs text-slate-500 mb-3">Plagiarism Report, Datasets, or Title Page &bull; Optional</p>

                        <label className="inline-block cursor-pointer bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm">
                            <span>Browse Supplementary File</span>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,.zip"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        onChange({
                                            supplementaryFileName: file.name,
                                            supplementaryFileUrl: URL.createObjectURL(file),
                                        });
                                    }
                                }}
                            />
                        </label>

                        {data.supplementaryFileName && (
                            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 py-1.5 px-3 rounded-md">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span className="truncate max-w-[200px]">{data.supplementaryFileName}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                <button
                    type="button"
                    onClick={() => {
                        localStorage.setItem("ijlsg_submission_draft", JSON.stringify(data));
                        alert("Draft saved successfully to browser storage.");
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 transition-colors"
                >
                    ▣ Save as Draft
                </button>

                <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#075dc0] to-[#001e65] text-white font-extrabold text-sm md:text-base rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                    Proceed to Payment Details &nbsp; →
                </button>
            </div>
        </form>
    );
}
