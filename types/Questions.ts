interface Question {
  p1: number;
  p2: number;
  correctAnswer: number;
  round: number;
  givenAnswer: number | null;
}
type Questions = Question[];
export type { Questions, Question };
