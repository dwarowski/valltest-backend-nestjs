import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateAnswerDto } from 'src/features/answers/create-answer/create-answer.dto';

export class CreateProblemDto {
  @IsNotEmpty()
  @IsNumber()
  testId: number;
  @IsNotEmpty()
  @IsString()
  question: string;
  @IsNotEmpty()
  answers: CreateAnswerDto[];
}
