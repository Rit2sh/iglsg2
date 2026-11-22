import { getArticles } from "../actions";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, FileEdit, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

function getStatusIcon(status: string) {
    switch (status) {
        case "SUBMITTED":
            return <FileText className="w-5 h-5 text-blue-500" />;
        case "IN_REVIEW":
            return <Clock className="w-5 h-5 text-orange-500" />;
        case "APPROVED":
            return <CheckCircle2 className="w-5 h-5 text-green-500" />;
        case "REJECTED":
            return <XCircle className="w-5 h-5 text-red-500" />;
        case "PUBLISHED":
            return <FileEdit className="w-5 h-5 text-purple-500" />;
        default:
            return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
}

function getStatusBadge(status: string) {
    switch (status) {
        case "SUBMITTED":
            return <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Submitted</Badge>;
        case "IN_REVIEW":
            return <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">In Review</Badge>;
        case "APPROVED":
            return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Approved</Badge>;
        case "REJECTED":
            return <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Rejected</Badge>;
        case "PUBLISHED":
            return <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">Published</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
}

export default async function ArticlesPage() {
    const { data: articles } = await getArticles();
    const articlesList = articles || [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
                    <p className="text-muted-foreground mt-1 text-lg">
                        Manage your articles and track their review progress.
                    </p>
                </div>
                <Link href="/submission">
                    <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2">
                        New Submission
                    </div>
                </Link>
            </div>

            {articlesList.length === 0 ? (
                <div className="p-12 text-center border rounded-xl bg-muted/20 border-dashed">
                    <FileText className="w-12 h-12 text-muted-foreground opacity-50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No submissions yet</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-6">You haven{"'"}t submitted any articles for review.</p>
                    <Link href="/submission" className="text-primary hover:underline">
                        Submit your first article
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {articlesList.map((article) => (
                        <Card key={article.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md border-border/50 hover:border-primary/50">
                            <CardHeader className="bg-muted/10 pb-4 border-b border-border/50">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="bg-primary/10 p-2.5 rounded-full">
                                        {getStatusIcon(article.status)}
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {getStatusBadge(article.status)}
                                        <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                                            {article.stage.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                </div>
                                <CardTitle className="text-xl mt-4 line-clamp-2">{article.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-5 space-y-4 flex-1 text-sm bg-card">
                                <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                                    {article.abstract}
                                </p>
                            </CardContent>
                            <CardFooter className="pt-3 border-t border-border/50 bg-muted/5 flex justify-between items-center text-xs text-muted-foreground">
                                <span className="font-medium">
                                    Submitted {new Date(article.createdAt).toLocaleDateString()}
                                </span>
                                <Link href={`/article/${article.id}`} className="text-primary font-medium hover:underline">
                                    View Details &rarr;
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
