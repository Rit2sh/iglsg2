import ArticleItem from "./ArticleItem";

export default function SectionBlock({ title, articles }: any) {
    return (
        <div className="space-y-4">

            <h2 className="text-lg font-semibold border-b pb-2">
                {title}
            </h2>

            <div className="space-y-4">
                {articles.map((article: any) => (
                    <ArticleItem key={article.id} article={article} />
                ))}
            </div>

        </div>
    );
}