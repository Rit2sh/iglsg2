import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ReduxProvider } from "./Redux/ReduxProvider";
import { store } from "./Redux/store";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthLoader from "@/components/AuthLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JIAS | Journal of Intercontinental Academic Studies",
  description: "Journal of Intercontinental Academic Studies - Peer-Reviewed International Journal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ReduxProvider>
          <AuthLoader />
          <Toaster closeButton position="bottom-center" />
          <TooltipProvider>{children}</TooltipProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
