// app/profile/layout.tsx
import MobileProfileNav from "./_components/MobileProfileNav";
import ProfileSidebar from "./_components/ProfileSidebar";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-black">

            {/* Mobile Navigation Header */}
            <div className="md:hidden border-b bg-white/70 backdrop-blur-xl dark:bg-slate-950/70 p-4 sticky top-0 z-50">
                <MobileProfileNav />
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <ProfileSidebar />
            </div>

            {/* Content */}
            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}