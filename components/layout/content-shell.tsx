import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const shell = cn(
  "mx-auto flex w-full flex-1 flex-col gap-10 px-5 py-12 sm:px-8 lg:gap-12 lg:py-16"
);

/** Centered column — restrained width, airy vertical rhythm */
export function ContentShell({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  /** `reading`: comfortable line measure for passages */
  width?: "default" | "reading" | "wide";
}) {
  const max =
    width === "reading"
      ? "max-w-3xl"
      : width === "wide"
        ? "max-w-5xl lg:max-w-6xl"
        : "max-w-2xl lg:max-w-3xl";

  return <main className={cn(shell, max, className)}>{children}</main>;
}
