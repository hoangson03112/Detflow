import Link from "next/link";
import {
  AlarmClock,
  BookOpenCheck,
  GraduationCap,
  LineChart,
  PenLine,
  RefreshCw,
  Route,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { ContentShell } from "@/components/layout/content-shell";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const coreLoops: {
  href: string;
  title: string;
  badge: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    href: "/reading",
    title: "1. Feedback ngay (Đọc)",
    badge: "Core loop",
    description:
      "Làm đến đâu — biết đúng sai tới đó. Nhịp ôn không chờ một buổi sau mới biết chỗ yếu.",
    icon: Zap,
  },
  {
    href: "/writing",
    title: "2. Viết + lưu nháp",
    badge: "Chuẩn bị",
    description:
      "Gửi nháp lên máy chủ. Feedback và outline có hướng dẫn nối vào trong lượt sau của phần viết.",
    icon: PenLine,
  },
  {
    href: "/review",
    title: "3. Ôn câu sai",
    badge: "Lặp có kiểm soát",
    description:
      "Câu trượt lưu tại một tab — ôn đúng chỗ sai, không chỉ chuyển sang đề mới.",
    icon: RefreshCw,
  },
  {
    href: "/active-recall",
    title: "4. Active recall",
    badge: "Gợi nhớ",
    description:
      "Điền chỗ trống, viết lại câu — không nhìn đáp án trong lúc đang cố nhớ.",
    icon: BookOpenCheck,
  },
  {
    href: "/progress",
    title: "5. Tiến độ",
    badge: "Số liệu",
    description: "Điểm ngắn hạn và (sớm) tổng hợp theo chủ đề bạn hay trượt.",
    icon: LineChart,
  },
];

const extra = [
  { href: "/timed", icon: AlarmClock, label: "Luyện theo đồng hồ" },
  { href: "/goals", icon: GraduationCap, label: "Điểm mục tiêu DET" },
  { href: "/methods", icon: Route, label: "Phương pháp nâng cao" },
] as const;

export default function HomePage() {
  return (
    <ContentShell width="wide" className="gap-14 lg:gap-16">
      <section className="space-y-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/90">
          Duolingo English Test · Detflow
        </p>
        <h1 className="max-w-xl text-balance text-[1.75rem] font-semibold tracking-[-0.035em] sm:text-[2.125rem]">
          Lộ trình ôn DET cho người Việt
        </h1>
        <p className="max-w-2xl text-pretty text-[0.9375rem] leading-[1.65] text-muted-foreground">
          Giao diện tối giản:{" "}
          <span className="text-foreground/90">phản hồi ngay</span> khi làm trắc nghiệm, ôn lại chỗ sai có kiểm soát, và chỗ
          nhìn thấy tiến độ của chính bạn — không chỉ một list đề dài.
        </p>
        <Separator className="my-8 max-w-xs opacity-40" />
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {coreLoops.map((item) => (
          <Card key={item.href} className="flex flex-col border-border/50">
            <CardHeader>
              <div className="mb-2 flex items-start justify-between gap-2">
                <item.icon className="size-5 shrink-0 text-foreground/70" aria-hidden />
              </div>
              <CardTitle className="text-[1.0625rem] font-medium leading-snug tracking-[-0.02em]">
                {item.title}
              </CardTitle>
              <p className="text-[11px] font-medium uppercase tracking-wide text-primary/85">{item.badge}</p>
              <CardDescription className="pt-2 text-[13px] leading-relaxed">{item.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto border-t border-border/40 bg-muted/10 pt-4">
              <Link href={item.href} className={cn(buttonVariants({ variant: "default" }), "w-full sm:w-auto")}>
                Vào bài
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>

      <Card className="border-dashed border-border/60 bg-muted/15 shadow-none">
        <CardHeader>
          <CardTitle className="text-[0.9375rem] font-medium tracking-[-0.02em]">
            Không chỉ ghép gamification vào tay không
          </CardTitle>
          <CardDescription className="text-[13px] leading-relaxed">
            Luyện giờ, mục tiêu điểm, SRS và adaptive được liệt kê rõ — làm tuần tự, không nhồi hết một lượt.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2.5">
          {extra.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "inline-flex items-center gap-2 font-normal"
              )}
            >
              <l.icon className="size-3.5 opacity-80" aria-hidden />
              {l.label}
            </Link>
          ))}
          <Link href="/practice" className={cn(buttonVariants({ variant: "secondary" }))}>
            Luyện tập — tất cả
          </Link>
        </CardContent>
      </Card>

      <footer className="border-t border-border/40 pt-8 text-[13px] leading-relaxed text-muted-foreground">
        Một vòng ôn tốt: phản hồi nhỏ thường xuyên, ôn lại chỗ sai, và đôi khi không nhìn đáp án trước khi cố nhớ.
      </footer>
    </ContentShell>
  );
}
