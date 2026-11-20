export default function IssueHeader({ issue }: any) {
    return (
        <div className="space-y-2 border-b pb-6">

            <p className="text-sm uppercase tracking-wide text-gray-500">
                Journal Issue
            </p>

            <h1 className="text-3xl font-serif font-semibold">
                Volume {issue.volume}, Issue {issue.issue}
            </h1>

            <p className="text-gray-600">
                {issue.journalName} • {issue.publicationPeriod} {issue.publicationYear}
            </p>

        </div>
    );
}