import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function PageIntro({ eyebrow, title, description, action, className }: PageIntroProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 transition-opacity duration-200 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/90">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance text-[1.625rem] font-semibold tracking-[-0.03em] text-foreground sm:text-[1.875rem]">
          {title}
        </h1>
        <p className="max-w-[40rem] text-[0.9375rem] leading-[1.65] text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
