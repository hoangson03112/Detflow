import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-xl border border-border/70 bg-transparent px-3 py-1.5 text-[15px] transition-[border-color,color,box-shadow] duration-200 outline-none placeholder:text-muted-foreground/85 focus-visible:border-primary/35 focus-visible:ring-[3px] focus-visible:ring-primary/14 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/35 disabled:opacity-50 aria-invalid:border-destructive/50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/12 md:text-sm dark:bg-card/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
