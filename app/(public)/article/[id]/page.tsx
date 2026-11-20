
import { ARTICLES } from "@/Data/Articles";
import ArticleDetailPage from "../_component/ArticleDetails";

export default async function Article({ params }: { params: Promise<{ id: string }> }) {

    const resolvedParams = await params;
    const article = ARTICLES.find(article => article.id === resolvedParams.id);

    if (!article) return <div>Article not found</div>;

    return (
        <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] py-12 px-4">
            <ArticleDetailPage article={article} />
        </main>
    );
}