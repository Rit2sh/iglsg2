import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SectionTitle({
    children,
    icon: Icon,
    action,
}: {
    children: React.ReactNode;
    icon?: React.ElementType;
    action?: { label: string; href: string };
}) {
    return (
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
                {Icon && (
                    <div className="w-7 h-7 rounded-lg bg-[#1E3A8A]/10 dark:bg-[#3B82F6]/15 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#3B82F6]" />
                    </div>
                )}
                <h3 className="text-[16px] font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                    {children}
                </h3>
            </div>
            {action && (
                <Link
                    href={action.href}
                    className="flex items-center gap-1 text-[12px] font-semibold text-[#0EA5E9] dark:text-[#22D3EE] hover:underline"
                >
                    {action.label}
                    <ChevronRight className="w-3 h-3" />
                </Link>
            )}
        </div>
    );
}
