'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LogoutAll, LogoutSession } from '../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { fetchUser } from '@/app/Redux/slice/User.slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/Redux/store'
import { LogOut, Loader2, Power } from 'lucide-react'

interface LogoutProps {
    id: string
    refreshToken: string
    variant?: "destructive" | "ghost" | "outline"
}

export default function Logout({ id, refreshToken, variant = "destructive" }: LogoutProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = async () => {
        setIsLoading(true)
        try {
            const data = await LogoutSession(id, refreshToken)
            if (data?.success) {
                toast.success(data.message)
                dispatch(fetchUser())
                router.push("/signin")
            } else {
                toast.error(data?.message || "Failed to logout")
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant={variant}
            size="sm"
            disabled={isLoading}
            onClick={handleLogout}
            className="h-8 gap-2"
        >
            {isLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
                <LogOut className="h-3.5 w-3.5" />
            )}
            <span>{variant === "ghost" ? "" : "Logout"}</span>
        </Button>
    )
}

export function LogoutAllSession({ id }: { id: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleLogoutAll = async () => {
        setIsLoading(true)
        try {
            const data = await LogoutAll(id)
            if (data?.success) {
                toast.success(data.message)
                dispatch(fetchUser())
                router.push("/signin")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            onClick={handleLogoutAll}
            disabled={isLoading}
            className="w-full md:w-auto gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:hover:bg-red-950"
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Power className="h-4 w-4" />
            )}
            Logout All Devices
        </Button>
    )
}