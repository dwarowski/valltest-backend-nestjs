export class TestWithRatingDto {
  id: number;
  testName: string;
  difficulty: string;
  timeForTest: number;
  createdAt: Date;
  tags: string[];
  averageRating: number;
}
