import Link from "next/link";

export default function ArticleItem({ article }: any) {
    return (
        <div className="space-y-1">

            <Link
                href={`/article/${article.id}`}
                className="text-lg font-medium text-blue-700 hover:underline"
            >
                {article.title}
            </Link>

            <p className="text-sm text-gray-600">
                {article.createdBy?.name}
            </p>

            <p className="text-xs text-gray-500">
                Pages {article.pageStart}–{article.pageEnd}
            </p>

        </div>
    );
}