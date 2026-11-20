import { getSubmissions } from './action'
import { SubmissionsTable } from './_components/SubmissionsTable'

export default async function page() {
    const submissions = await getSubmissions();
    return (
        <div>
            {submissions.data && <SubmissionsTable submissions={submissions.data} />}
        </div>
    )
}
