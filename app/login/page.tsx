import Link from "next/link";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

export const metadata = {
  title: "Đăng nhập",
};

type Props = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const err = searchParams ? (await searchParams).error : undefined;
  let errorMessage: string | undefined;
  if (typeof err === "string") {
    try {
      errorMessage = decodeURIComponent(err.replace(/\+/g, " "));
    } catch {
      errorMessage = err;
    }
  }

  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-background">
      {/* Nền: vài lớp mờ, không làm chiếm sự chú ý */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-[100%] bg-primary/[0.06] blur-3xl dark:bg-primary/[0.09]" />
        <div className="absolute bottom-0 right-0 h-[280px] w-[480px] translate-x-1/4 translate-y-1/4 rounded-full bg-muted/60 blur-3xl dark:bg-muted/20" />
      </div>

      <Link
        href="/"
        className="absolute left-5 top-5 z-10 text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground sm:left-8 sm:top-8"
      >
        ← Trang chủ
      </Link>

      <div className="flex flex-1 flex-col items-center justify-center px-5 pb-20 pt-20 sm:px-8">
        <div className="w-full max-w-[416px]">
          <header className="mb-10 text-center sm:mb-12">
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-[1.125rem] bg-gradient-to-b from-muted/70 to-muted/30 text-lg font-semibold tracking-tight text-foreground shadow-[var(--shadow-surface-xs)] ring-1 ring-border/55 dark:from-white/12 dark:to-white/[0.04] dark:ring-white/10">
              D
            </div>
            <h1 className="text-[1.875rem] font-semibold leading-tight tracking-[-0.04em] sm:text-[2rem]">
              Chào bạn quay lại
            </h1>
            <p className="mx-auto mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              Đăng nhập một bước với Google.
            </p>
          </header>

          <div
            className="rounded-[1.5rem] border border-border/60 bg-card/85 p-8 shadow-[0_4px_24px_rgb(15_23_42/0.06),0_1px_2px_rgb(15_23_42/0.04)] ring-1 ring-black/[0.03] backdrop-blur-sm supports-[backdrop-filter]:bg-card/72 dark:bg-card/50 dark:shadow-[0_4px_32px_rgb(0_0_0/0.35)] dark:ring-white/[0.06] sm:p-10"
          >
            {errorMessage ? (
              <div
                className="mb-6 rounded-xl border border-destructive/20 bg-destructive/[0.06] px-4 py-3 text-[13px] leading-snug text-destructive dark:bg-destructive/10"
                role="alert"
              >
                {errorMessage}
              </div>
            ) : null}

            <p className="mb-6 text-[13px] leading-relaxed text-muted-foreground">
              Bạn chỉ cần tài khoản Google — không tạo mật khẩu khác hay điền form dài trên Detflow.
            </p>

            <GoogleSignInButton />

            <p className="mt-8 text-center text-[12px] leading-relaxed text-muted-foreground/70">
              Bằng cách nhấn đăng nhập, bạn chấp nhận các điều khoản và cách Detflow xử lý dữ liệu tài khoản
              của bạn.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
