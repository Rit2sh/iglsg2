import React from 'react'
import { Card } from '@/components/ui/card'
import SectionTitle from './SectionTitle'
import { Users } from 'lucide-react'
import { BOARD_MEMBERS } from '@/Data/EditorialBoard'
import BoardMemberCard from '@/components/Editorial-board/BoardMemberCard'

export default function EditorialBoard() {
    return (
        <Card className='p-4'>
            <SectionTitle
                icon={Users}
                action={{ label: "View All", href: "/editorial-board" }}
            >
                Editorial Board
            </SectionTitle>

            <div className="flex flex-wrap gap-2 justify-evenly">
                {BOARD_MEMBERS.map((member, i) => (
                    <BoardMemberCard key={i} member={member} />
                ))}
            </div>
        </Card >
    )
}
