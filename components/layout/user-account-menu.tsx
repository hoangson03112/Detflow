"use client";

import { Menu } from "@base-ui/react/menu";
import { ChevronDownIcon, LogOutIcon } from "lucide-react";
import { useTransition } from "react";

import { signOutAction } from "@/app/actions/auth";
import type { AuthUserBrief } from "@/lib/auth/brief-user";
import { cn } from "@/lib/utils";

const itemBase =
  "flex cursor-pointer items-center gap-2 rounded-lg py-2 pl-3 pr-8 text-[13px] leading-tight text-foreground outline-none select-none data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-40";

const menuPopupCn = cn(
  "outline-hidden origin-[var(--transform-origin)] z-50 min-w-[14rem]",
  "rounded-xl border border-border/70 bg-popover py-1.5 text-popover-foreground shadow-[var(--shadow-surface-sm)]",
  "transition-[transform,scale,opacity] duration-150",
  "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
  "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0"
);

function InitialAvatar({ name, email }: { name: string | null; email: string | null }) {
  const initial = (name?.trim()?.[0] ?? email?.trim()?.[0] ?? "?").toUpperCase();
  return (
    <span
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[12px] font-semibold text-foreground/90 ring-1 ring-border/60"
      aria-hidden
    >
      {initial}
    </span>
  );
}

export function UserAccountMenu({ user }: { user: AuthUserBrief }) {
  const [pending, startTransition] = useTransition();
  const displayName = user.name ?? user.email ?? "Tài khoản";

  return (
    <Menu.Root>
      <Menu.Trigger
        type="button"
        className={cn(
          "group inline-flex max-w-full items-center gap-2 rounded-xl border border-transparent py-1 pl-1 pr-2",
          "text-[13px] font-medium text-foreground outline-none transition-[background-color,border-color,box-shadow] duration-200",
          "hover:bg-muted/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35",
          "data-[popup-open]:border-border/60 data-[popup-open]:bg-muted/50"
        )}
        aria-label="Menu tài khoản"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0 rounded-full object-cover ring-1 ring-border/60"
            referrerPolicy="no-referrer"
          />
        ) : (
          <InitialAvatar name={user.name} email={user.email} />
        )}
        <span className="hidden min-w-0 max-[420px]:max-w-[8rem] truncate sm:inline">{displayName}</span>
        <ChevronDownIcon
          className="size-3.5 shrink-0 text-muted-foreground duration-200 group-data-[popup-open]:rotate-180"
          aria-hidden
        />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="outline-hidden" align="end" side="bottom" sideOffset={8}>
          <Menu.Popup className={menuPopupCn}>
            <Menu.Group className="px-1">
              <div className="border-b border-border/50 px-2.5 pb-2 pt-1">
                <p className="truncate text-[13px] font-medium text-foreground">{displayName}</p>
                {user.email ? (
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{user.email}</p>
                ) : null}
              </div>
              <Menu.Separator className="mx-2 my-1.5 h-px shrink-0 bg-border/60" />
              <Menu.Item
                className={cn(
                  itemBase,
                  "text-destructive data-[highlighted]:bg-destructive/12 data-[highlighted]:text-destructive"
                )}
                disabled={pending}
                closeOnClick
                label="Đăng xuất"
                onClick={() => {
                  startTransition(() => {
                    void signOutAction();
                  });
                }}
              >
                <LogOutIcon className="size-3.5 opacity-85" aria-hidden />
                <span>{pending ? "Đang đăng xuất…" : "Đăng xuất"}</span>
              </Menu.Item>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
