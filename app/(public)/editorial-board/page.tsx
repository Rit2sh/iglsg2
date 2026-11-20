
import { Separator } from "@/components/ui/separator";
import BoardMemberCard from '@/components/Editorial-board/BoardMemberCard';
import { BOARD_MEMBERS } from "@/Data/EditorialBoard";

const FILTERS = ['All', 'Chief Editors', 'Executive Board', 'Technical Committee'];

const ROLE_MAP: Record<string, string> = {
    'Chief Editors': 'chief',
    'Executive Board': 'exec',
    'Technical Committee': 'tech',
};

export default function EditorialBoardPage() {
    // const [active, setActive] = useState('All');

    // const filtered = active === 'All'
    //     ? BOARD_MEMBERS
    //     : BOARD_MEMBERS.filter(m => m.role === ROLE_MAP[active]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">

            {/* Header */}
            <section className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                    Peer Review & Governance
                </p>
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 font-serif">
                    Editorial Board
                </h1>
                <p className="mt-4 text-base text-slate-500 max-w-2xl leading-relaxed">
                    Our international editorial board comprises leading experts across diverse academic
                    disciplines, ensuring the highest standards of scientific integrity and peer-review excellence.
                </p>
                <Separator className="mt-8" />
            </section>

            {/* Stats */}
            <div className="grid grid-cols-3 divide-x divide-slate-200 border border-slate-200 rounded-xl mb-10 overflow-hidden">
                {[
                    { num: '42', label: 'Board Members' },
                    { num: '18', label: 'Countries' },
                    { num: '12', label: 'Disciplines' },
                ].map(s => (
                    <div key={s.label} className="py-5 text-center bg-slate-50">
                        <p className="text-3xl font-bold text-slate-900">{s.num}</p>
                        <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            {/* <div className="flex flex-wrap gap-2 mb-8">
                {FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => setActive(f)}
                        className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-colors
              ${active === f
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        {f}
                    </button>
                ))}
            </div> */}

            {/* Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(member => (
                    <BoardMemberCard key={member.id} member={member} />
                ))}
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {BOARD_MEMBERS.map(member => (
                    <BoardMemberCard key={member.id} member={member} />
                ))}
            </div>

            {/* CTA */}
            <section className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Interested in joining our board?</h2>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">
                        We are always looking for distinguished researchers to help shape the future of scientific publishing.
                    </p>
                </div>
                <button className="shrink-0 bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors">
                    Review Guidelines
                </button>
            </section>

        </div>
    );
}