"use client";

import { useState, useTransition } from "react";

import { gradeReadingAnswers } from "@/app/actions/reading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ReadingGradeResult, ReadingQuestionPublic } from "@/lib/det/types";
import { recordReadingGradeDetailed } from "@/lib/local/mistakes-progress";
import { cn } from "@/lib/utils";

type ReadingQuizProps = {
  passageId: string;
  passageTitle: string;
  questions: ReadingQuestionPublic[];
};

export function ReadingQuiz({
  passageId,
  passageTitle,
  questions,
}: ReadingQuizProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReadingGradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submitted = result !== null;

  function handleSubmit() {
    setError(null);
    const selectionsNum: Record<string, number> = {};
    for (const q of questions) {
      const value = selections[q.id];
      if (value === undefined) {
        setError("Hãy trả lời đủ tất cả câu hỏi trước khi gửi.");
        return;
      }
      selectionsNum[q.id] = Number.parseInt(value, 10);
    }

    startTransition(async () => {
      const res = await gradeReadingAnswers({
        passageId,
        selections: selectionsNum,
      });
      if (!res.ok) {
        setError(res.message);
        return;
      }
      setResult(res.result);
      const prompts = Object.fromEntries(
        questions.map((q) => [q.id, q.prompt])
      );
      recordReadingGradeDetailed(passageId, passageTitle, res.result, prompts);
    });
  }

  function itemForQuestion(questionId: string) {
    return result?.items.find((i) => i.questionId === questionId);
  }

  return (
    <div className="space-y-6">
      {questions.map((q, idx) => {
        const graded = itemForQuestion(q.id);
        return (
          <Card key={q.id} className="shadow-sm">
            <CardHeader className="border-b border-border/45 pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Câu {idx + 1}
              </CardTitle>
              <CardDescription className="pt-2 text-base leading-relaxed text-foreground">
                {q.prompt}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-5">
              <RadioGroup
                value={selections[q.id]}
                onValueChange={(value) => {
                  if (submitted) return;
                  setSelections((prev) => ({ ...prev, [q.id]: value }));
                }}
                disabled={submitted}
                className="gap-3"
              >
                {q.choices.map((choice, choiceIndex) => {
                  const value = String(choiceIndex);
                  let highlight = "border-border/65 bg-background";
                  if (submitted && graded) {
                    if (choiceIndex === graded.correctIndex) {
                      highlight =
                        "border-primary/30 bg-primary/[0.05] dark:bg-primary/[0.08] dark:border-primary/35";
                    } else if (
                      graded.selectedIndex === choiceIndex &&
                      choiceIndex !== graded.correctIndex
                    ) {
                      highlight =
                        "border-destructive/35 bg-destructive/[0.04] dark:border-destructive/40 dark:bg-destructive/[0.07]";
                    }
                  }
                  return (
                    <label
                      key={choiceIndex}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-[background-color,border-color] duration-200",
                        submitted ? "cursor-default" : "hover:bg-muted/45",
                        highlight
                      )}
                    >
                      <RadioGroupItem
                        value={value}
                        disabled={submitted}
                        className="mt-0.5"
                      />
                      <span className="text-sm leading-relaxed text-foreground">{choice}</span>
                    </label>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>
        );
      })}

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {result ? (
        <Card className="border-primary/12 bg-muted/15 shadow-[var(--shadow-surface-xs)]">
          <CardHeader>
            <CardTitle className="text-[15px] font-medium tracking-[-0.02em]">Kết quả</CardTitle>
            <CardDescription>
              Đúng {result.correctCount}/{result.total} — {result.scorePercent}% (phản hồi ngay sau khi nộp)
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={pending || submitted}
        size="lg"
      >
        {submitted ? "Đã chấm" : pending ? "Đang chấm…" : "Gửi bài và xem đúng/sai"}
      </Button>
    </div>
  );
}
