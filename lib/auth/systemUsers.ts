export interface SystemAccount {
    id: string;
    email: string;
    password: string;
    role: "ADMIN" | "MANAGER" | "EDITOR" | "PRE_REVIEWER" | "DRAFTER" | "USER";
    firstName: string;
    lastName: string;
    designation: string;
    institution: string;
    redirectUrl: string;
}

export const SYSTEM_ACCOUNTS: SystemAccount[] = [
    {
        id: "sys-admin-01",
        email: "admin@ijlsg.org",
        password: "Ijlsg@2026#Secure",
        role: "ADMIN",
        firstName: "Chief",
        lastName: "Administrator",
        designation: "System Administrator",
        institution: "Journal of Intercontinental Academic Studies",
        redirectUrl: "/admin/dashboard",
    },
    {
        id: "sys-manager-02",
        email: "manager@ijlsg.org",
        password: "Ijlsg@2026#Secure",
        role: "MANAGER",
        firstName: "Editorial",
        lastName: "Manager",
        designation: "Managing Editor",
        institution: "Journal of Intercontinental Academic Studies",
        redirectUrl: "/dashboard",
    },
    {
        id: "sys-editor-03",
        email: "editor@ijlsg.org",
        password: "Ijlsg@2026#Secure",
        role: "EDITOR",
        firstName: "Senior",
        lastName: "Editor",
        designation: "Section Editor",
        institution: "Journal of Intercontinental Academic Studies",
        redirectUrl: "/dashboard",
    },
    {
        id: "sys-reviewer-04",
        email: "reviewer@ijlsg.org",
        password: "Ijlsg@2026#Secure",
        role: "PRE_REVIEWER",
        firstName: "Peer",
        lastName: "Reviewer",
        designation: "Lead Reviewer",
        institution: "Journal of Intercontinental Academic Studies",
        redirectUrl: "/dashboard",
    },
    {
        id: "sys-drafter-05",
        email: "drafter@ijlsg.org",
        password: "Ijlsg@2026#Secure",
        role: "DRAFTER",
        firstName: "Manuscript",
        lastName: "Drafter",
        designation: "Editorial Drafter",
        institution: "Journal of Intercontinental Academic Studies",
        redirectUrl: "/dashboard",
    },
    {
        id: "sys-user-06",
        email: "user@ijlsg.org",
        password: "Ijlsg@2026#Secure",
        role: "USER",
        firstName: "Author",
        lastName: "Scholar",
        designation: "Research Scholar",
        institution: "Intercontinental Academic Network",
        redirectUrl: "/",
    },
];

export function findSystemAccount(email: string): SystemAccount | undefined {
    return SYSTEM_ACCOUNTS.find(
        (acc) => acc.email.toLowerCase() === (email || "").trim().toLowerCase()
    );
}

export function findSystemAccountById(id: string): SystemAccount | undefined {
    return SYSTEM_ACCOUNTS.find((acc) => acc.id === id);
}
