
'use server'

import prisma from "@/lib/prisma";
import verifyUser from "@/lib/auth/verifyUser";
import { articleSchema, ArticleSchemaType } from "@/lib/validation/articleSchema";
import cloudinary from "@/lib/cloudinary";
export interface CloudinaryUploadResponse {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder: string;
    original_filename: string;
    api_key: string;
}
export async function submitArticle(data: ArticleSchemaType) {
    const authResult = await verifyUser();
    if (!authResult || !authResult.user) {
        return { success: false, message: "You are not authorized to submit an article", data: null };
    }
    const { user } = authResult;
    try {

        const parseData = articleSchema.parse(data);
        const file = data.file;
        if (!file) {
            return { success: false, message: "No file", data: null };
        }
        const NewArticle = await prisma.article.create({
            data: {
                title: parseData.title,
                abstract: parseData.abstract,
                category: parseData.category,
                authorId: user.id,
            }
        });
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadRes = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: "auto",
                        folder: "articles",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as any);
                    }
                )
                .end(buffer);
        });

        if (!uploadRes) {
            return { success: false, message: "Failed to upload file", data: null };
        }
        if (!NewArticle) {
            return { success: false, message: "Failed to create article, try again", data: null };
        }
        const newFile = await prisma.file.create({
            data: {
                articleId: NewArticle.id,
                url: uploadRes.secure_url,
                fileSize: uploadRes.bytes,
                fileName: uploadRes.original_filename,
                fileType: uploadRes.resource_type,
                stage: "SUBMISSION",
            },
        });

        await prisma.workflowLog.create({
            data: {
                articleId: NewArticle.id,
                userId: user.id,
                action: "CREATE",
                metadata: {
                    url: uploadRes.secure_url,
                    fileName: uploadRes.original_filename,
                    fileType: uploadRes.resource_type,
                },
            },
        });

        return {
            success: true,
            message: "Article submitted successfully",
            data: null
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to submit article",
            data: null
        };
    }
}
