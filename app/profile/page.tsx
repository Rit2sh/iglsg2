import { GetUserData } from "./actions";
import RoleSection from "./_components/RoleSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, ShieldCheck } from "lucide-react";
import Logout from "./_components/Logout";

export default async function ProfilePage() {
    const { data } = await GetUserData();
    if (!data) return <p className="p-6 text-center animate-pulse">Loading profile...</p>;

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
            {/* HEADER SECTION */}
            <header className="flex flex-col md:flex-row items-center gap-6 bg-card p-6 rounded-2xl border shadow-sm">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                    {data.avatar && <AvatarImage src={data.avatar} alt={data.firstName + " " + data.lastName || "User"} />}
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {data.firstName?.charAt(0) + " " + data.lastName?.charAt(0) || "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">{data.firstName + " " + data.lastName}</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1.5 text-sm">
                            <Mail className="h-4 w-4" /> {data.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                            <ShieldCheck className="h-4 w-4" />
                            <Badge variant="secondary" className="capitalize">{data.role.toLowerCase()}</Badge>
                        </div>
                    </div>
                </div>
                <Logout id={data.sessionId} refreshToken={data.refreshToken} />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* ROLE SECTION */}
                    <RoleSection role={data.role} />
                </div>
            </div>
        </div>
    );
}