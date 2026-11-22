import { getSubmissions } from './action'
import { SubmissionsTable } from './_components/SubmissionsTable'

export default async function page() {
    const submissions = await getSubmissions();
    return (
        <div>
            <SubmissionsTable submissions={submissions.data || []} />
        </div>
    )
}
