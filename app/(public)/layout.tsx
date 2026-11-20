import Footer from "@/components/Footer/Footer";
import { PublicNavbar } from "@/components/Header/PublicNavbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PublicNavbar />
            {children}
            <Footer />
        </>
    );
}