import type { ReadingGradeResult } from "@/lib/det/types";

export const STORAGE_MISTAKES = "detflow-mistakes-v2";
export const STORAGE_PROGRESS = "detflow-progress-v2";

export type SavedMistake = {
  id: string;
  passageId: string;
  passageTitle: string;
  prompt: string;
  choices: string[];
  wrongIndex: number | null;
  correctIndex: number;
  recordedAt: string;
  skill: "comprehension" | "vocab" | "inference";
};

export type ReadingAttempt = {
  passageId: string;
  passageTitle: string;
  scorePercent: number;
  at: string;
};

export type StoredProgress = {
  readingAttempts: ReadingAttempt[];
};

function inferSkill(prompt: string): SavedMistake["skill"] {
  const lower = prompt.toLowerCase();
  if (lower.includes("vocab") || lower.includes("what does") || lower.includes("word")) {
    return "vocab";
  }
  if (lower.includes("infer") || lower.includes("suggest") || lower.includes("imply")) {
    return "inference";
  }
  return "comprehension";
}

export function loadMistakes(): SavedMistake[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_MISTAKES);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedMistake[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function loadProgress(): StoredProgress {
  if (typeof window === "undefined") {
    return { readingAttempts: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_PROGRESS);
    if (!raw) return { readingAttempts: [] };
    const parsed = JSON.parse(raw) as StoredProgress;
    return parsed?.readingAttempts ? parsed : { readingAttempts: [] };
  } catch {
    return { readingAttempts: [] };
  }
}

export function saveProgress(p: StoredProgress) {
  localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(p));
}

/**
 * Sau khi chấm điểm Reading: lưu từng câu sai + thêm vào lịch sử điểm.
 */
export function recordReadingGradeDetailed(
  passageId: string,
  passageTitle: string,
  result: ReadingGradeResult,
  promptsByQuestionId: Record<string, string>
) {
  if (typeof window === "undefined") return;

  const now = new Date().toISOString();
  const previous = loadMistakes();

  const newRows: SavedMistake[] = [];
  for (const row of result.items) {
    if (row.selectedIndex === row.correctIndex) continue;

    newRows.push({
      id: `${row.questionId}-${now}`,
      passageId,
      passageTitle,
      prompt: promptsByQuestionId[row.questionId] ?? "",
      choices: row.choices,
      wrongIndex: row.selectedIndex,
      correctIndex: row.correctIndex,
      recordedAt: now,
      skill: inferSkill(promptsByQuestionId[row.questionId] ?? ""),
    });
  }

  const merged = [...newRows, ...previous].slice(0, 200);
  localStorage.setItem(STORAGE_MISTAKES, JSON.stringify(merged));

  const prog = loadProgress();
  prog.readingAttempts.unshift({
    passageId,
    passageTitle,
    scorePercent: result.scorePercent,
    at: now,
  });
  prog.readingAttempts = prog.readingAttempts.slice(0, 80);
  saveProgress(prog);
}

export function clearMistakes(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_MISTAKES);
}
