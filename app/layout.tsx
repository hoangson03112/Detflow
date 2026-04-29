import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Detflow — DET practice",
    template: "%s · Detflow",
  },
  description: "DET-style reading and writing practice with Next.js and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans text-[15px] leading-relaxed">{children}</body>
    </html>
  );
}
