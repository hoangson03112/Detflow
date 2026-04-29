import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-xl border border-border/70 bg-transparent px-3 py-2.5 text-[15px] transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-muted-foreground/85 focus-visible:border-primary/35 focus-visible:ring-[3px] focus-visible:ring-primary/14 disabled:cursor-not-allowed disabled:bg-muted/35 disabled:opacity-50 aria-invalid:border-destructive/50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/12 md:text-sm dark:bg-card/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
