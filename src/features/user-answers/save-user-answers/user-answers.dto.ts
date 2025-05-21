import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class UserAnswersDto {
  @IsNumber()
  testId: number;

  @IsArray()
  @ArrayNotEmpty()
  userAnswers: {
    problemId: number;
    answerId: number;
  }[];
}
