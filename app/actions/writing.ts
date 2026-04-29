"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const saveSchema = z.object({
  promptId: z.string().uuid(),
  body: z.string().min(1).max(20_000),
});

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export async function saveWritingSubmission(
  input: z.infer<typeof saveSchema>
): Promise<{ ok: true } | { ok: false; message: string }> {
  const parsed = saveSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Please enter a response." };
  }

  const wordCount = countWords(parsed.data.body);
  const supabase = await createClient();

  const { error } = await supabase.from("writing_submissions").insert({
    prompt_id: parsed.data.promptId,
    body: parsed.data.body,
    word_count: wordCount,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true };
}
