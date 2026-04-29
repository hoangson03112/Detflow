import Link from "next/link";

import { cn } from "@/lib/utils";

const primary = [
  { href: "/practice", label: "Luyện tập" },
  { href: "/reading", label: "Đọc" },
  { href: "/writing", label: "Viết" },
] as const;

const secondary = [
  { href: "/review", label: "Ôn sai" },
  { href: "/active-recall", label: "Gợi nhớ" },
  { href: "/progress", label: "Tiến độ" },
  { href: "/timed", label: "Giờ" },
  { href: "/goals", label: "Mục tiêu" },
  { href: "/methods", label: "Nâng cao" },
] as const;

const navLinkSecondary = cn(
  "text-[13px] text-muted-foreground/90 duration-200 transition-colors",
  "hover:text-foreground hover:underline hover:underline-offset-4 hover:decoration-border/70"
);

const navLinkPrimary = cn(
  "text-[13px] font-medium text-foreground/88 duration-200 transition-colors",
  "hover:text-primary hover:underline hover:underline-offset-4 hover:decoration-primary/35"
);

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/55 bg-background/80 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-5 py-4 sm:px-8 lg:max-w-3xl lg:gap-5 lg:pb-5 lg:pt-6">
        <div className="flex items-start justify-between gap-4">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-[-0.02em] text-foreground opacity-95 duration-200 hover:opacity-100"
          >
            Detflow
          </Link>
          <p className="hidden max-w-[10rem] text-right text-[10px] leading-snug tracking-wide text-muted-foreground/85 sm:block">
            Luyện DET
          </p>
        </div>
        <nav
          className="-mx-0.5 flex flex-wrap gap-x-3 gap-y-2 sm:gap-x-4"
          aria-label="Điều hướng chính"
        >
          {primary.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkPrimary}>
              {item.label}
            </Link>
          ))}
          <span className="hidden text-muted-foreground/35 sm:inline" aria-hidden>
            ·
          </span>
          {secondary.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkSecondary}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
