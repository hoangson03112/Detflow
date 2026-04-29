import Link from "next/link";

import { ContentShell } from "@/components/layout/content-shell";
import { PageIntro } from "@/components/layout/page-intro";
import { WritingExercise } from "@/components/writing/writing-exercise";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getWritingPrompt } from "@/lib/det/queries";

export const metadata = {
  title: "Viết",
};

export default async function WritingPage() {
  const prompt = await getWritingPrompt();

  return (
    <ContentShell>
      <PageIntro
        eyebrow="Viết DET"
        title="Viết — phản hồi không ngay được như trắc nghiệm"
        description="Nhập bài, đếm từ và lưu lên Supabase. Chấm theo DET và gợi ý chỉnh câu (AI) plus outline có hướng dẫn sẽ nối vào sau — để không lệ thuộc chỉ vào một con số mà không biết sửa câu chỗ nào."
      />

      {!prompt ? (
        <Card className="border-dashed border-border/65 bg-muted/10 shadow-none">
          <CardHeader>
            <CardTitle className="text-[15px] font-medium tracking-[-0.02em]">Chưa có đề viết trong database</CardTitle>
            <CardDescription>
              Chạy file{" "}
              <code className="rounded-md bg-muted/80 px-1.5 py-0.5 text-[11px]">
                supabase/migrations/001_det_practice.sql
              </code>{" "}
              trong Supabase SQL, rồi tải lại trang.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
              Về trang chủ
            </Link>
          </CardContent>
        </Card>
      ) : (
        <WritingExercise promptId={prompt.id} title={prompt.title} promptBody={prompt.body} />
      )}
    </ContentShell>
  );
}
