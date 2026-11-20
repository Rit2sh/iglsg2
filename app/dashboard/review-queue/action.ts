export const AssignedManuscripts = {
    success: true,
    data: [
        {
            id: "MS-2026-0042",
            title: "Digital Sovereignty and International Law: A Comparative Study",
            stage: "UNDER_REVIEW", // In the peer-review phase
            reviewersCount: 2,    // Needs 1 more for the 3-reviewer minimum
            submittedAt: "2026-04-12T10:00:00Z",
            category: "Research Article",
            isAnonymized: true,    // Compliance check for double-blind integrity
        },
        {
            id: "MS-2026-0045",
            title: "Climate Litigation in South Asia: Emerging Trends in Social Governance",
            stage: "REVISIONS_REQUIRED", // Feedback sent to author
            reviewersCount: 3,    // Minimum reviewer threshold met
            submittedAt: "2026-04-15T14:30:00Z",
            category: "Case Commentary",
            isAnonymized: true,
        },
        {
            id: "MS-2026-0048",
            title: "The Impact of AI on Judicial Neutrality in Indian Courts",
            stage: "AWAITING_ASSIGNMENT", // Manager approved, awaiting handling editor
            reviewersCount: 0,
            submittedAt: "2026-04-28T09:15:00Z",
            category: "Research Article",
            isAnonymized: true,
        },
        {
            id: "MS-2026-0039",
            title: "Legal Frameworks for Rural Governance: A Post-Pandemic Analysis",
            stage: "ACCEPTED", // Passed all checks and ready for production
            reviewersCount: 3,
            submittedAt: "2026-03-20T11:00:00Z",
            category: "Theses",
            isAnonymized: true,
        }
    ]
};