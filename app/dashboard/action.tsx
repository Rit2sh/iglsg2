// Example response for getBoardMetrics()
export const getBoardMetrics = {
    success: true,
    data: {
        assignedCount: 8,          // Manuscripts currently under the editor's oversight
        needsReviewers: 3,         // Approved manuscripts that haven't been sent to 3 reviewers yet
        revisionCount: 2,          // Articles currently back with authors for corrections
        readyForDoi: 1,            // Articles that passed review and are ready for DOI registration
        totalBoardMembers: 15,     // Total EB members for compliance tracking
        verifiedBoardMembers: 12,  // Members who confirmed via official email within 5 days
        avgReviewDays: 18,         // Journal efficiency metric
    }
};

// Example response for getAssignedManuscripts()
export const getAssignedManuscripts = {
    success: true,
    data: [
        {
            id: "MS-2026-0042",
            title: "Digital Sovereignty and International Law: A Comparative Study",
            stage: "UNDER_REVIEW", // Matches our defined workflow stages
            reviewersCount: 2,    // Shows progress toward the mandatory 3-reviewer minimum
            submittedAt: "2026-04-12T10:00:00Z",
            category: "Research Article",
            isAnonymized: true,    // Compliance check for double-blind integrity
        },
        {
            id: "MS-2026-0045",
            title: "Climate Litigation in South Asia: Emerging Trends in Social Governance",
            stage: "REVISIONS_REQUIRED",
            reviewersCount: 3,
            submittedAt: "2026-04-15T14:30:00Z",
            category: "Case Commentary",
            isAnonymized: true,
        },
        {
            id: "MS-2026-0048",
            title: "The Impact of AI on Judicial Neutrality in Indian Courts",
            stage: "AWAITING_ASSIGNMENT",
            reviewersCount: 0,
            submittedAt: "2026-04-28T09:15:00Z",
            category: "Research Article",
            isAnonymized: true,
        },
        {
            id: "MS-2026-0039",
            title: "Legal Frameworks for Rural Governance: A Post-Pandemic Analysis",
            stage: "ACCEPTED",
            reviewersCount: 3,
            submittedAt: "2026-03-20T11:00:00Z",
            category: "Theses",
            isAnonymized: true,
        }
    ]
};