import Link from "next/link";

import { ContentShell } from "@/components/layout/content-shell";
import { PageIntro } from "@/components/layout/page-intro";
import { PassageCard } from "@/components/reading/passage-card";
import { ReadingQuiz } from "@/components/reading/reading-quiz";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getReadingExercise } from "@/lib/det/queries";

export const metadata = {
  title: "Đọc",
};

export default async function ReadingPage() {
  const data = await getReadingExercise();

  return (
    <ContentShell width="reading">
      <PageIntro
        eyebrow="Feedback ngay"
        title="Đọc hiểu"
        description="Đọc đoạn văn và trả lời câu hỏi. Sau khi gửi, bạn biết đúng và sai không trễ — đó là vòng lặp ôn không thể bỏ qua."
      />

      {!data ? (
        <Card className="border-dashed border-border/65 bg-muted/10 shadow-none">
          <CardHeader>
            <CardTitle className="text-[15px] font-medium tracking-[-0.02em]">Chưa có bài đọc</CardTitle>
            <CardDescription>
              Chạy file SQL{" "}
              <code className="rounded-md bg-muted/80 px-1.5 py-0.5 text-[11px]">
                supabase/migrations/001_det_practice.sql
              </code>{" "}
              trong Supabase SQL Editor, rồi tải lại trang.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl duration-200")}>
              Về trang chủ
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-10">
          <PassageCard title={data.passage.title} body={data.passage.body} />
          <ReadingQuiz
            passageId={data.passage.id}
            passageTitle={data.passage.title}
            questions={data.questions}
          />
        </div>
      )}
    </ContentShell>
  );
}
