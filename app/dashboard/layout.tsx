import DashboardSidebar from "@/components/Header/DashboardSidebar";
import DashboardTopBar from "@/components/Header/DashboardTopBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex h-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#020617]">
            <DashboardSidebar />

            <div className="flex flex-col flex-1 min-w-0 h-full">

                <DashboardTopBar />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
                        {children}
                    </div>

                    <footer className="mt-12 py-6 border-t border-dashed border-border/60">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                            JIAS Editorial Management System • Confidential & Secure
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
}