import prisma from "@/lib/prisma";
import IssueHeader from "../_components/IssueHeader";
import IssueInfo from "../_components/IssueInfo";
import SectionBlock from "../_components/SectionBlock";
import { ARTICLES } from "@/Data/Articles";

export default async function IssuePage({ params }: any) {
    let issue: any[] = [];
    try {
        issue = await prisma.article.findMany();
    } catch {
        issue = [];
    }

    const currentIssueMeta = (issue && issue[0]) ? issue[0] : {
        volume: 1,
        issue: 1,
        journalName: "Journal of Intercontinental Academic Studies",
        publicationPeriod: "January - June",
        publicationYear: 2026,
    };

    const articlesList = (issue && issue.length > 0) ? issue : ARTICLES.map(a => ({
        ...a,
        status: "PUBLISHED",
        stage: "PUBLISHED",
        category: a.category || "Research Articles",
    }));

    // Group by category
    const grouped = articlesList.reduce((acc: any, article: any) => {
        const key = article.category || "Research Articles";
        if (!acc[key]) acc[key] = [];
        acc[key].push(article);
        return acc;
    }, {});

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <IssueHeader issue={currentIssueMeta} />
            <IssueInfo issue={currentIssueMeta} />

            {/* Sections */}
            {Object.entries(grouped).map(([key, articles]: any) => (
                <SectionBlock key={key} title={key} articles={articles} />
            ))}
        </div>
    );
}