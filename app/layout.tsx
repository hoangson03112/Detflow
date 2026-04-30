import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { AppHeader } from "@/components/layout/app-header";
import { getAuthUserBrief } from "@/lib/auth/brief-user";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Detflow — DET practice",
    template: "%s · Detflow",
  },
  description: "DET-style reading and writing practice with Next.js and Supabase.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authUser = await getAuthUserBrief();

  return (
    <html
      lang="vi"
      className={`h-full antialiased ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body
        className="flex min-h-full flex-col font-sans text-[15px] leading-relaxed"
        suppressHydrationWarning
      >
        <AppHeader user={authUser} />
        {children}
      </body>
    </html>
  );
}
