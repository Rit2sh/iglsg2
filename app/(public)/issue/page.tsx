import ArticleCard from "@/components/Article/ArticleCard";
import { ARTICLES } from "@/Data/Articles";
export default function CurrentIssuePage() {


    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">Current Issue</h1>

            <div className="grid gap-4">
                {ARTICLES.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}