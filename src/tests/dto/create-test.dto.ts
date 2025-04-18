import { IsString } from 'class-validator';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';

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
