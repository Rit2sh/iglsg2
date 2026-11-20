import { z } from "zod";

export const articleSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters long"),
    abstract: z.string().min(50, "Abstract must be at least 50 characters"),
    keywords: z.string().min(1, "Please provide at least one keyword"),
    category: z.string().min(1, "Category is required"),
    file: z.any().optional(),
});

export type ArticleSchemaType = z.infer<typeof articleSchema>;

// --- Sub-Interfaces ---
export interface ArticleAuthor {
    id: string;
    name: string;
    email: string;
    image?: string;
}

export interface ArticleFile {
    id: string;
    url: string;
    fileName: string;
    fileType: string;

    stage: "SUBMISSION" | "REVIEW" | "PRE_REVIEW" | "DRAFT" | "FINAL" | "PUBLISHED" | string;
    createdAt?: string;
}

export interface IArticle {
    id: string;
    title: string;
    abstract: string;
    keywords: string;
    category: string;

    journalName: string;
    volume: number;
    issue: number;
    publicationYear: number;

    publicationPeriod: string;

    pageStart: number;
    pageEnd: number;
    doi: string;
    publishedAt: string | Date | null;

    // Workflow State
    status: "PENDING" | "APPROVED" | "REJECTED" | "PUBLISHED" | string;
    stage: "SUBMISSION" | "REVIEW" | "PRE_REVIEW" | "DRAFT" | "FINAL" | "PUBLISHED" | string;

    // Relations
    author: ArticleAuthor;
    files: ArticleFile[];

    // Timestamps
    createdAt: string | Date;
    updatedAt: string | Date;
}

