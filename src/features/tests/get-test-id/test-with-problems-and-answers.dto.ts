export class TestWithProblemsAndAnswers {
  id: number;
  testName: string;
  difficulty: string;
  timeForTest: number;
  createdAt: Date;
  problems: {
    id: number;
    question: string;
    answers: {
      id: number;
      value: string;
    }[];
  }[];
}
