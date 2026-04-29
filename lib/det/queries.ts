import { createClient } from "@/lib/supabase/server";
import type {
  ReadingPassageRow,
  ReadingQuestionPublic,
  ReadingQuestionRow,
  WritingPromptRow,
} from "@/lib/det/types";

export type ReadingPageData = {
  passage: Pick<ReadingPassageRow, "id" | "title" | "body">;
  questions: ReadingQuestionPublic[];
};

export async function getReadingExercise(): Promise<ReadingPageData | null> {
  const supabase = await createClient();

  const { data: passage, error: passageError } = await supabase
    .from("reading_passages")
    .select("id, title, body")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (passageError || !passage) {
    return null;
  }

  const { data: rawQuestions, error: qError } = await supabase
    .from("reading_questions")
    .select("id, prompt, choices, sort_order")
    .eq("passage_id", passage.id)
    .order("sort_order", { ascending: true });

  if (qError || !rawQuestions?.length) {
    return null;
  }

  const questions: ReadingQuestionPublic[] = rawQuestions.map(
    (q: {
      id: string;
      prompt: string;
      choices: string[] | unknown;
    }) => ({
      id: q.id,
      prompt: q.prompt,
      choices: Array.isArray(q.choices)
        ? (q.choices as string[])
        : JSON.parse(String(q.choices)) as string[],
    })
  );

  return { passage, questions };
}

export async function getReadingAnswerKey(
  passageId: string
): Promise<ReadingQuestionRow[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reading_questions")
    .select("id, passage_id, prompt, choices, answer_index, sort_order")
    .eq("passage_id", passageId)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return null;
  }

  return data.map((row) => ({
    ...row,
    choices: Array.isArray(row.choices)
      ? (row.choices as string[])
      : (JSON.parse(String(row.choices)) as string[]),
  }));
}

export async function getWritingPrompt(): Promise<WritingPromptRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("writing_prompts")
    .select("id, title, body, created_at")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}
