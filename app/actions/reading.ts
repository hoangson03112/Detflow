"use server";

import { z } from "zod";
import { getReadingAnswerKey } from "@/lib/det/queries";
import type { ReadingGradeResult } from "@/lib/det/types";

const gradeSchema = z.object({
  passageId: z.string().uuid(),
  selections: z.record(z.string().uuid(), z.number().int().min(0)),
});

export async function gradeReadingAnswers(
  input: z.infer<typeof gradeSchema>
): Promise<
  { ok: true; result: ReadingGradeResult } | { ok: false; message: string }
> {
  const parsed = gradeSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid submission." };
  }

  const { passageId, selections } = parsed.data;
  const rows = await getReadingAnswerKey(passageId);
  if (!rows?.length) {
    return { ok: false, message: "Could not load questions." };
  }

  let correctCount = 0;
  const items: ReadingGradeResult["items"] = [];

  for (const row of rows) {
    const selected = selections[row.id];
    const selectedIndex = selected === undefined ? null : selected;
    const isCorrect = selectedIndex === row.answer_index;
    if (isCorrect) {
      correctCount += 1;
    }
    items.push({
      questionId: row.id,
      selectedIndex,
      correctIndex: row.answer_index,
      choices: row.choices,
    });
  }

  const total = rows.length;
  const scorePercent = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  return {
    ok: true,
    result: {
      correctCount,
      total,
      scorePercent,
      items,
    },
  };
}
