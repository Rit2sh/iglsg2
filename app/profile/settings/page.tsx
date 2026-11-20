
import PreLoader from "@/components/PreLoader";
import { GetUserData, GetUserDataResponseType } from "../actions";
import { BadgeCheck } from "lucide-react";
import ProfileDataSetting from "../_components/ProfileDataSetting";


export default async function EnhancedSettingsPage() {
    const data = await GetUserData();

    if (!data?.success) return <PreLoader />;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Author Profile
                    </h1>
                    <p className="text-muted-foreground">Manage your scholarly identity and contact details.</p>
                </div>
                <BadgeCheck className="w-12 h-12 text-[#0EA5E9] opacity-20 hidden md:block" />
            </div>
            <ProfileDataSetting user={data.data as GetUserDataResponseType} />

        </div>
    );
}