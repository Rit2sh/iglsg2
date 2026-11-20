export default function IssueInfo({ issue }: any) {
    return (
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
                {issue.description || "This issue contains scholarly articles covering various topics."}
            </p>
        </div>
    );
}