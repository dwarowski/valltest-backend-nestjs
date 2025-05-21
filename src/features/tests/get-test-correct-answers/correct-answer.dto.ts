import { IsNumber } from 'class-validator';

export class CorrectAnswerDto {
  @IsNumber()
  problemId: number;
  @IsNumber()
  answerId: number;
}
