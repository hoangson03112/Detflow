"use client";

import { useMemo, useState, useTransition } from "react";

import { saveWritingSubmission } from "@/app/actions/writing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type WritingExerciseProps = {
  promptId: string;
  title: string;
  promptBody: string;
};

function wordCount(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function WritingExercise({
  promptId,
  title,
  promptBody,
}: WritingExerciseProps) {
  const [draftTitle, setDraftTitle] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );
  const [pending, startTransition] = useTransition();

  const count = useMemo(() => wordCount(text), [text]);

  function composeBody() {
    const trimmedTitle = draftTitle.trim();
    const trimmed = text.trim();
    if (!trimmedTitle) {
      return trimmed;
    }
    return `${trimmedTitle}\n\n${trimmed}`;
  }

  function handleSubmit() {
    setMessage(null);
    const body = composeBody();
    if (!text.trim()) {
      setMessage({ type: "err", text: "Hãy viết nội dung chính trước khi gửi." });
      return;
    }

    startTransition(async () => {
      const res = await saveWritingSubmission({ promptId, body });
      if (!res.ok) {
        setMessage({ type: "err", text: res.message });
        return;
      }
      setMessage({
        type: "ok",
        text: "Đã lưu bài trên máy chủ — chấm theo DET rubric (AI/coach) sẽ báo trong bước tới để có feedback ngắt quãng không quá xa ngày học của bạn.",
      });
    });
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/55 bg-muted/12 shadow-none ring-1 ring-border/35">
        <CardHeader className="py-5">
          <CardTitle className="text-[15px] font-medium tracking-[-0.02em]">Feedback sau khi có bài</CardTitle>
          <CardDescription className="text-[13px] leading-relaxed">
            Hiện chỉ lưu nháp. Phản hồi có chất — chấm theo DET, chỉnh câu và outline không để học viết mù — sẽ nối ở bước
            tiếp theo của phần viết.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="border-b border-border/45 pb-5">
          <CardTitle className="text-[1.125rem] font-semibold tracking-[-0.02em] leading-snug">{title}</CardTitle>
          <CardDescription className="text-[11px] uppercase tracking-[0.15em]">Đề Viết DET</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/95">
            {promptBody}
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="draft-title" className="text-sm font-medium text-foreground">
                Tiêu đề làm nháp <span className="font-normal text-muted-foreground">(không bắt buộc)</span>
              </label>
              <Input
                id="draft-title"
                placeholder="Ví dụ: Proposal for community garden"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                disabled={pending}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="essay-body" className="text-sm font-medium">
                Bài viết
              </label>
              <Textarea
                id="essay-body"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Viết nháp tại đây…"
                rows={12}
                className="min-h-[220px] resize-y text-base"
                disabled={pending}
                aria-label="Bài viết"
              />
              <p className="text-sm text-muted-foreground">
                Số từ: <span className="tabular-nums text-foreground">{count}</span>
              </p>
            </div>
            {message ? (
              <p
                className={
                  message.type === "ok"
                    ? "text-sm text-foreground/85"
                    : "text-sm text-destructive"
                }
                role={message.type === "err" ? "alert" : "status"}
              >
                {message.text}
              </p>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-border/40 bg-muted/10">
          <Button type="button" onClick={handleSubmit} disabled={pending} size="lg">
            {pending ? "Đang lưu…" : "Lưu bài"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
