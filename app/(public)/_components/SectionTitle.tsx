import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SectionTitle({
    children,
    action,
}: {
    children: React.ReactNode;
    icon?: React.ElementType;
    action?: { label: string; href: string };
}) {
    return (
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E2E8F0] dark:border-[#1E293B]">
            <h3 className="text-[15px] font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight">
                {children}
            </h3>
            {action && (
                <Link
                    href={action.href}
                    className="flex items-center gap-1 text-[12px] font-semibold text-[#1E3A8A] dark:text-[#38BDF8] hover:underline"
                >
                    {action.label}
                    <ChevronRight className="w-3 h-3" />
                </Link>
            )}
        </div>
    );
}
