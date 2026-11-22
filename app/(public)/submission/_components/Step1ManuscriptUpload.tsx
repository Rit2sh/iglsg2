"use client";

import React, { useState } from "react";
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

    const abstractWords = data.abstract.trim() ? data.abstract.trim().split(/\s+/).length : 0;

    const handleAddKeyword = () => {
        const val = keywordInput.trim().replace(/^,+|,+$/g, "");
        if (!val) return;
        if (data.keywords.length >= 6) {
            setErrors((prev) => ({ ...prev, keywords: "Maximum 6 keywords permitted." }));
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
                authors: `The selected journal permits a maximum of ${authorLimit} authors.`,
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
        if (!data.journalId) newErr.journalId = "Select target journal.";
        if (!data.category) newErr.category = "Select manuscript category.";
        if (!data.title.trim()) newErr.title = "Manuscript title is required.";
        if (!data.abstract.trim()) newErr.abstract = "Abstract is required.";
        else if (abstractWords > 250) newErr.abstract = "Abstract must not exceed 250 words.";
        if (data.keywords.length < 3) newErr.keywords = "Provide at least 3 keywords.";
        if (!data.researchTheme.trim()) newErr.researchTheme = "Select research area.";

        if (!data.authors[0]?.name.trim()) newErr.author0 = "First author full name is required.";
        if (!data.authors[0]?.affiliation.trim()) newErr.author0Aff = "First author affiliation is required.";
        if (!data.correspondingEmail.trim()) newErr.email = "Corresponding author email is required.";
        if (!data.correspondingMobile.trim()) newErr.mobile = "Corresponding author phone number is required.";

        if (!data.manuscriptFileName) {
            newErr.manuscriptFile = "Attach the manuscript file (DOCX or PDF).";
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
            <div className="bg-[#061a43] text-white rounded-lg px-6 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-bold tracking-tight">
                        Step 1: Manuscript, Authors &amp; File Upload
                    </h2>
                    <p className="text-xs text-slate-300">
                        Enter article details, add co-authors, and upload the primary manuscript document.
                    </p>
                </div>
                <span className="text-xs font-mono font-semibold bg-white/10 text-white px-2.5 py-1 rounded">
                    {selectedJournal.shortName}
                </span>
            </div>

            {/* Section A: Manuscript Details */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        A. Manuscript Information
                    </h3>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                            Target Journal <span className="text-red-600">*</span>
                        </label>
                        <select
                            value={data.journalId}
                            onChange={(e) => {
                                const newJ = e.target.value;
                                onChange({ journalId: newJ });
                                const limit = JOURNALS[newJ]?.max || 6;
                                if (data.authors.length > limit) {
                                    onChange({ authors: data.authors.slice(0, limit) });
                                }
                            }}
                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-[#061a43] focus:outline-none"
                        >
                            {Object.values(JOURNALS).map((j) => (
                                <option key={j.id} value={j.id}>
                                    {j.name} (Max {j.max} Authors)
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                            {selectedJournal.note}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                            Article Category <span className="text-red-600">*</span>
                        </label>
                        <select
                            value={data.category}
                            onChange={(e) => onChange({ category: e.target.value })}
                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-[#061a43] focus:outline-none"
                        >
                            <option value="Research Article">Original Research Article</option>
                            <option value="Review Article">Comprehensive Review Article</option>
                            <option value="Case Study">Case Law Analysis &amp; Brief</option>
                            <option value="Legislative Commentary">Legislative &amp; Policy Commentary</option>
                            <option value="Book Review">Academic Book Review</option>
                            <option value="Short Communication">Short Communication / Working Paper</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                            Manuscript Title <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => onChange({ title: e.target.value })}
                            placeholder="Complete scholarly title of the manuscript"
                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-[#061a43] focus:outline-none"
                        />
                        <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                            <span>Use standard title casing without unnecessary abbreviations.</span>
                            <span>{data.title.length} characters</span>
                        </div>
                        {errors.title && <p className="text-xs text-red-600 mt-1 font-medium">{errors.title}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                            Abstract <span className="text-red-600">*</span>{" "}
                            <span className="font-normal text-slate-500 text-xs">(Max 250 words)</span>
                        </label>
                        <textarea
                            rows={4}
                            value={data.abstract}
                            onChange={(e) => onChange({ abstract: e.target.value })}
                            placeholder="State the research background, methodology, empirical findings, and socio-legal implications..."
                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-3 text-sm text-slate-900 dark:text-slate-100 leading-relaxed focus:border-[#061a43] focus:outline-none"
                        />
                        <div className="flex justify-between items-center text-xs mt-1">
                            <span className={abstractWords > 250 ? "text-red-600 font-semibold" : "text-slate-500"}>
                                Word count: {abstractWords} / 250 words
                            </span>
                            {abstractWords > 250 && (
                                <span className="text-red-600 font-semibold">Exceeds allowed length.</span>
                            )}
                        </div>
                        {errors.abstract && <p className="text-xs text-red-600 mt-1 font-medium">{errors.abstract}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                            Keywords <span className="text-red-600">*</span>{" "}
                            <span className="font-normal text-slate-500 text-xs">(Provide 3 to 6 terms)</span>
                        </label>
                        <div className="flex flex-wrap items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-md min-h-[44px]">
                            {data.keywords.map((kw, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-2.5 py-1 rounded text-xs font-medium"
                                >
                                    {kw}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveKeyword(i)}
                                        className="text-slate-400 hover:text-red-600 ml-0.5"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                            {data.keywords.length < 6 && (
                                <div className="flex items-center gap-2 flex-1 min-w-[180px]">
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
                                        placeholder={data.keywords.length === 0 ? "Type keyword & press Enter" : "Add keyword"}
                                        className="bg-transparent border-0 text-sm focus:outline-none flex-1 py-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddKeyword}
                                        className="text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                        {errors.keywords && <p className="text-xs text-red-600 mt-1 font-medium">{errors.keywords}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                            Research Area / Subject Discipline <span className="text-red-600">*</span>
                        </label>
                        <select
                            value={data.researchTheme}
                            onChange={(e) => onChange({ researchTheme: e.target.value })}
                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-[#061a43] focus:outline-none"
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
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        B. Authors &amp; Institutional Affiliations
                    </h3>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                        Max {authorLimit} Authors
                    </span>
                </div>

                <div className="p-6 space-y-4">
                    {data.authors.map((author, index) => (
                        <div
                            key={author.id}
                            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-3 bg-slate-50/50 dark:bg-slate-800/30"
                        >
                            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700 text-xs">
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                    Author {author.order} {index === 0 && "(Primary Author)"}
                                </span>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                                        <input
                                            type="radio"
                                            name="correspondingAuthor"
                                            checked={author.isCorresponding}
                                            onChange={() => handleAuthorChange(index, "isCorresponding", true)}
                                            className="text-[#061a43] focus:ring-0"
                                        />
                                        <span>Corresponding Author</span>
                                    </label>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAuthor(index)}
                                            className="text-red-600 hover:underline text-xs"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={author.name}
                                        onChange={(e) => handleAuthorChange(index, "name", e.target.value)}
                                        placeholder="Full Name"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs focus:border-[#061a43] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={author.email}
                                        onChange={(e) => handleAuthorChange(index, "email", e.target.value)}
                                        placeholder="author@institution.edu"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs focus:border-[#061a43] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Designation *
                                    </label>
                                    <input
                                        type="text"
                                        value={author.designation}
                                        onChange={(e) => handleAuthorChange(index, "designation", e.target.value)}
                                        placeholder="Designation"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs focus:border-[#061a43] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Institution / Affiliation *
                                    </label>
                                    <input
                                        type="text"
                                        value={author.affiliation}
                                        onChange={(e) => handleAuthorChange(index, "affiliation", e.target.value)}
                                        placeholder="University or College"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs focus:border-[#061a43] focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {data.authors.length < authorLimit && (
                        <button
                            type="button"
                            onClick={handleAddAuthor}
                            className="py-2.5 px-4 border border-dashed border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                            + Add Co-Author ({data.authors.length + 1} of {authorLimit})
                        </button>
                    )}
                    {errors.authors && <p className="text-xs text-red-600 font-medium">{errors.authors}</p>}

                    {/* Corresponding Author Direct Contact */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                            Corresponding Author Contact Information
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                                    Official Email Address <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.correspondingEmail}
                                    onChange={(e) => onChange({ correspondingEmail: e.target.value })}
                                    placeholder="editorial correspondence address"
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm focus:border-[#061a43] focus:outline-none"
                                />
                                {errors.email && <p className="text-xs text-red-600 mt-1 font-medium">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                                    Direct Phone / WhatsApp Number <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={data.correspondingMobile}
                                    onChange={(e) => onChange({ correspondingMobile: e.target.value })}
                                    placeholder="+91 XXXXX XXXXX"
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm focus:border-[#061a43] focus:outline-none"
                                />
                                {errors.mobile && <p className="text-xs text-red-600 mt-1 font-medium">{errors.mobile}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section C: Upload Manuscript Documents */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        C. Upload Manuscript Documents
                    </h3>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Primary File */}
                    <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-5 bg-slate-50/50 dark:bg-slate-800/30">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
                            Primary Manuscript File <span className="text-red-600">*</span>
                        </h4>
                        <p className="text-xs text-slate-500 mb-3">MS Word (.docx) or PDF (.pdf) &bull; Up to 20 MB</p>

                        <label className="inline-block cursor-pointer bg-[#061a43] hover:bg-[#00245d] text-white text-xs font-semibold px-4 py-2 rounded">
                            Select File
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
                            <div className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                Attached: {data.manuscriptFileName}
                            </div>
                        )}
                        {errors.manuscriptFile && (
                            <p className="text-xs text-red-600 mt-2 font-medium">{errors.manuscriptFile}</p>
                        )}
                    </div>

                    {/* Supplementary File */}
                    <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-5 bg-slate-50/50 dark:bg-slate-800/30">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
                            Supplementary / Cover Letter File
                        </h4>
                        <p className="text-xs text-slate-500 mb-3">Plagiarism Report, Datasets, or Declarations &bull; Optional</p>

                        <label className="inline-block cursor-pointer bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold px-4 py-2 rounded">
                            Select File
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
                            <div className="mt-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Attached: {data.supplementaryFileName}
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
                        localStorage.setItem("jias_submission_draft", JSON.stringify(data));
                        alert("Submission draft saved to browser storage.");
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50"
                >
                    Save Draft
                </button>

                <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 bg-[#061a43] hover:bg-[#00245d] text-white font-bold text-sm rounded-md shadow-sm"
                >
                    Proceed to Payment Details &rarr;
                </button>
            </div>
        </form>
    );
}
