export type ReadingPassageRow = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

export type ReadingQuestionRow = {
  id: string;
  passage_id: string;
  prompt: string;
  choices: string[];
  answer_index: number;
  sort_order: number;
};

/** Safe to send to the client (no answer). */
export type ReadingQuestionPublic = {
  id: string;
  prompt: string;
  choices: string[];
};

export type WritingPromptRow = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

export type ReadingGradeResult = {
  correctCount: number;
  total: number;
  scorePercent: number;
  items: {
    questionId: string;
    selectedIndex: number | null;
    correctIndex: number;
    choices: string[];
  }[];
};
