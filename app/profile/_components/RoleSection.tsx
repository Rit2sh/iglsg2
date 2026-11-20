import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert, Briefcase, PenTool, User as UserIcon } from "lucide-react";

export default function RoleSection({ role }: { role: string }) {
    const configs: Record<string, { title: string; desc: string; icon: any; color: string }> = {
        ADMIN: { title: "Admin Panel", desc: "Full system access & user management.", icon: ShieldAlert, color: "text-red-500" },
        MANAGER: { title: "Manager Dashboard", desc: "Review workflows and team approvals.", icon: Briefcase, color: "text-blue-500" },
        EDITOR: { title: "Editor Workspace", desc: "Manage content and publishing.", icon: PenTool, color: "text-amber-500" },
        USER: { title: "User Dashboard", desc: "View your personal submissions.", icon: UserIcon, color: "text-green-500" },
    };

    const config = configs[role] || configs.USER;
    const Icon = config.icon;

    return (
        <Card className="overflow-hidden border-l-4 border-l-primary">
            <CardContent className="p-6 flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-800 ${config.color}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">{config.title}</h3>
                    <p className="text-muted-foreground text-sm">{config.desc}</p>
                </div>
            </CardContent>
        </Card>
    );
}