import { IsString } from 'class-validator';
import { CreateAnswerDto } from 'src/features/answers/create-answer/create-answer.dto';

export class CreateTestDto {
  difficulty: number;
  @IsString()
  testName: string;
  topicName: string;
  questions: {
    question: string;
    answers: CreateAnswerDto[];
  }[];
}
