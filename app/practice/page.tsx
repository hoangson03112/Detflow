import Link from "next/link";
import {
  Clock,
  ClipboardList,
  Mic,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

import { ContentShell } from "@/components/layout/content-shell";
import { PageIntro } from "@/components/layout/page-intro";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const deck: {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}[] = [
  {
    href: "/reading",
    title: "Đọc hiểu",
    subtitle: "Làm bài và nhận đúng sai ngay — vòng lõi phản hồi không trễ.",
    icon: Newspaper,
  },
  {
    href: "/writing",
    title: "Viết",
    subtitle: "Gửi nháp lên Supabase; feedback chi tiết và guided structure gắn sau.",
    icon: ClipboardList,
  },
  {
    href: "/timed",
    title: "Luyện theo đồng hồ",
    subtitle: "Countdown mock — gắn đề và auto submit sau.",
    icon: Clock,
  },
  {
    href: "/speech",
    title: "Nói (placeholder)",
    subtitle: "Đọc to / mock interview — giữ chỗ roadmap.",
    icon: Mic,
  },
];

export const metadata = {
  title: "Luyện tập",
};

export default function PracticeHubPage() {
  return (
    <ContentShell width="wide">
      <PageIntro
        eyebrow="Practice loop"
        title="Luồng luyện tập cốt lõi"
        description="Đọc và viết nối dữ liệu; ôn sai, SRS và adaptive gắn dần từ các tab khác."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {deck.map((item) => (
          <Card key={item.href} className="flex flex-col border-border/50">
            <CardHeader>
              <div className="mb-2 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-muted/80">
                  <item.icon className="size-5 text-foreground/75" aria-hidden />
                </span>
                <CardTitle className="text-[1.0625rem] font-medium tracking-[-0.02em]">
                  {item.title}
                </CardTitle>
              </div>
              <CardDescription className="leading-relaxed">{item.subtitle}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto border-t border-border/40 bg-muted/10 pt-4">
              <Link href={item.href} className={cn(buttonVariants())}>
                {item.href === "/speech" ? "Xem chỗ chờ" : "Vào bài"}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ContentShell>
  );
}
