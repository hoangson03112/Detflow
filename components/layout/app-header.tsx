"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserAccountMenu } from "@/components/layout/user-account-menu";
import { buttonVariants } from "@/components/ui/button";
import type { AuthUserBrief } from "@/lib/auth/brief-user";
import { cn } from "@/lib/utils";

export function AppHeader({ user }: { user: AuthUserBrief | null }) {
  const pathname = usePathname();
  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/55 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 dark:supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:max-w-6xl">
        <Link
          href="/"
          className="shrink-0 text-[15px] font-semibold tracking-[-0.02em] text-foreground opacity-95 duration-200 hover:opacity-100"
        >
          Detflow
        </Link>

        <nav className="flex min-w-0 flex-1 items-center justify-end gap-3 text-[13px]" aria-label="Chính">
          <Link
            href="/"
            className="hidden shrink-0 text-muted-foreground/90 transition-colors duration-200 hover:text-foreground sm:inline"
          >
            Trang chủ
          </Link>
          {user ? (
            <UserAccountMenu user={user} />
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "touch-manipulation font-medium"
              )}
            >
              Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
