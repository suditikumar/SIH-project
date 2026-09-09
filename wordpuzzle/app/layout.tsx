import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { TopHeader } from "@/components/navigation/TopHeader";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2C5E3B",
};

export const metadata: Metadata = {
  title: "WORD PUZZLE | Modern Accessible Word Search Game",
  description: "A polished, accessible word search puzzle game with multi-directional words, touch drag selection, and progression.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WORD PUZZLE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-size-normal">
      <body className="min-h-full flex flex-col bg-[#F5F7F4] text-[#18281E] antialiased">
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <TopHeader />
            <main className="flex-1 w-full pb-10 pt-4 px-3 sm:px-6">{children}</main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
