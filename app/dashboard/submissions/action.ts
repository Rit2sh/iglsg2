'use server'

import verifyUser from "@/lib/auth/verifyUser";
import prisma from "@/lib/prisma";


export async function getSubmissions() {
    const authResult = await verifyUser();

    if (!authResult || !authResult.user) {
        return {
            success: false,
            message: "User not found",
            data: null
        }
    }

    const { user } = authResult;
    if (user.role == "USER") {
        return {
            success: false,
            message: "You are not authorized to access this page",
            data: null
        }
    }
    try {

        const submissions = await prisma.article.findMany({
            where: {
                status: "SUBMITTED"
            },
            select: {
                id: true,
                title: true,
                category: true,
                keywords: true,
                authorId: true,
                createdAt: true,
                status: true,

                author: {
                    select: {
                        firstName: true,
                        middleName: true,
                        lastName: true,
                        email: true,
                        emailVerified: true,
                        avatar: true,

                    }
                },
                assignedEditor: {
                    select: {
                        id: true,
                        firstName: true,
                        middleName: true,
                        lastName: true,
                        email: true,
                        emailVerified: true,
                        avatar: true,
                    }
                },
            }
        })

        if (!submissions) {
            return {
                success: false,
                message: "No submissions found",
                data: null
            }
        }



        return {
            success: true,
            message: "Submissions fetched successfully",
            data: submissions
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to fetch submissions",
            data: null
        }
    }
}

export async function getSubmissionDetails(id: string) {
    const authResult = await verifyUser();

    if (!authResult || !authResult.user) {
        return {
            success: false,
            message: "User not found",
            data: null
        }
    }

    const { user } = authResult;
    if (user.role == "USER") {
        return {
            success: false,
            message: "You are not authorized to access this page",
            data: null
        }
    }
    try {

        const submission = await prisma.article.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                category: true,
                abstract: true,
                keywords: true,
                authorId: true,
                createdAt: true,
                status: true,
                assignedEditor: {
                    select: {
                        id: true,
                        firstName: true,
                        middleName: true,
                        lastName: true,
                        email: true,
                        emailVerified: true,
                        avatar: true,
                    }
                },
                author: {
                    select: {
                        firstName: true,
                        middleName: true,
                        lastName: true,
                        email: true,
                        emailVerified: true,
                        avatar: true,

                    }
                },
                files: {
                    select: {
                        id: true,
                        fileName: true,
                        url: true,
                        fileType: true,
                        fileSize: true,
                        stage: true,
                        createdAt: true,
                    }
                },
            }
        })

        if (!submission) {
            return {
                success: false,
                message: "No submission found",
                data: null
            }
        }

        return {
            success: true,
            message: "Submission fetched successfully",
            data: submission
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to fetch submission",
            data: null
        }
    }
}

// get Editor For Assign for Reviewing
export async function getEditorForAssign() {
    const authResult = await verifyUser();

    if (!authResult || !authResult.user) {
        return {
            success: false,
            message: "User not found",
            data: null
        }
    }

    const { user } = authResult;
    if (user.role !== "MANAGER") {
        return {
            success: false,
            message: "You are not authorized to access this page",
            data: null
        }
    }
    try {

        const editors = await prisma.user.findMany({
            where: {
                role: "EDITOR"
            },
            select: {
                id: true,
                firstName: true,
                middleName: true,
                lastName: true,
                email: true,
                role: true,
                emailVerified: true,
                avatar: true,
            }
        })

        if (!editors) {
            return {
                success: false,
                message: "No editors found",
                data: null
            }
        }

        return {
            success: true,
            message: "Editors fetched successfully",
            data: editors
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to fetch editors",
            data: null
        }
    }
}

// manager approval functions
export async function managerApprove({ submissionId, editorId }: { submissionId: string, editorId: string }) {
    if (!submissionId || !editorId) {
        return {
            success: false,
            message: "Submission ID and Editor ID are required",
            data: null
        }
    }
    const authResult = await verifyUser();

    if (!authResult || !authResult.user) {
        return {
            success: false,
            message: "User not found",
            data: null
        }
    }

    const { user } = authResult;
    if (user.role !== "MANAGER") {
        return {
            success: false,
            message: "You are not authorized to access this page",
            data: null
        }
    }
    try {

        const editor = await prisma.user.findUnique({
            where: {
                id: editorId
            }
        })
        const submission = await prisma.article.update({
            where: {
                id: submissionId
            },
            data: {
                status: "IN_REVIEW",
                assignedEditorId: editorId,
                updatedAt: new Date()
            }
        })
        if (!editor || !submission) {
            return {
                success: false,
                message: "No submission found or editor not found",
                data: null
            }
        }

        await prisma.articleAssignment.create({
            data: {
                articleId: submissionId,
                assignedToId: editorId,
                role: "EDITOR",
                status: "PENDING",
                assignedById: user.id,
                createdAt: new Date()
            }
        })
        await prisma.workflowLog.create({
            data: {
                articleId: submissionId,
                action: "MANAGER_APPROVED",
                userId: user.id,
                createdAt: new Date()
            }
        })
        // email notification for editor
        // await sendEmail({
        //     to: editor.email,
        //     subject: "New Article Assigned to You",
        //     text: `You have been assigned a new article to review. Please review the article and submit your feedback within the specified time frame.
        //     Article Title: ${submission.title}
        //     Article ID: ${submission.id}
        //     Assigned By: ${user.firstName} ${user.lastName}
        //     Assigned To: ${editor.firstName} ${editor.lastName}
        //     Assigned At: ${new Date().toISOString()}
        //     `,


        // })

        return {
            success: true,
            message: "Submission approved successfully",
            data: submission
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to approve submission",
            data: null
        }
    }
}

export async function managerReject(id: string) {
    const authResult = await verifyUser();

    if (!authResult || !authResult.user) {
        return {
            success: false,
            message: "User not found",
            data: null
        }
    }

    const { user } = authResult;
    if (user.role == "USER") {
        return {
            success: false,
            message: "You are not authorized to access this page",
            data: null
        }
    }
    try {

        const submission = await prisma.article.update({
            where: {
                id
            },
            data: {
                status: "REJECTED"
            }
        })

        if (!submission) {
            return {
                success: false,
                message: "No submission found",
                data: null
            }
        }

        return {
            success: true,
            message: "Submission rejected successfully",
            data: submission
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to reject submission",
            data: null
        }
    }
}



export type SubmitionsType = NonNullable<Awaited<ReturnType<typeof getSubmissions>>>['data']
export type SubmissionDetailsType = NonNullable<Awaited<ReturnType<typeof getSubmissionDetails>>>['data']
export type EditorType = NonNullable<Awaited<ReturnType<typeof getEditorForAssign>>>['data']
