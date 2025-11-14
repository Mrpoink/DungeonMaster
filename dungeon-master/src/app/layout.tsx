import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/app/components/LoadingContext";
import { Suspense } from "react";
import LoadingOverlayGlobal from "@/app/components/LoadingOverlayGlobal";
import RouteLoadingWatcher from "@/app/components/RouteLoadingWatcher";
import ReadyOnMount from "@/app/components/ReadyOnMount";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuestWeaver",
  description: "QuestWeaver - Your D&D Adventure Awaits!",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <LoadingOverlayGlobal />
          {/* Watch for transitions and show overlay early */}
          <Suspense fallback={null}>
            <RouteLoadingWatcher />
          </Suspense>
          {children}
          {/* Hide overlay once the new page has mounted */}
          <ReadyOnMount />
        </LoadingProvider>
      </body>
    </html>
  );
}
