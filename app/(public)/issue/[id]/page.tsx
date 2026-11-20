import prisma from "@/lib/prisma";
import IssueHeader from "../_components/IssueHeader";
import IssueInfo from "../_components/IssueInfo";
import SectionBlock from "../_components/SectionBlock";


export default async function IssuePage({ params }: any) {
    const issue = await prisma.article.findMany({
        // where: {
        //     volume: Number(params.id),
        // },
        // include: {
        //     createdBy: true,
        // },
    });

    // 🔥 group by category
    const grouped = issue.reduce((acc: any, article: any) => {
        const key = article.category || "Articles";
        if (!acc[key]) acc[key] = [];
        acc[key].push(article);
        return acc;
    }, {});

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">

            <IssueHeader issue={issue[0]} />
            <IssueInfo issue={issue[0]} />

            {/* Sections */}
            {Object.entries(grouped).map(([key, articles]: any) => (
                <SectionBlock key={key} title={key} articles={articles} />
            ))}

        </div>
    );
}