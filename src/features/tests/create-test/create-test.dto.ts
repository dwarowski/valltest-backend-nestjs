import { IsString } from 'class-validator';
import { CreateProblemDto } from 'src/features/problems/create-problem/create-problem.dto';

export class CreateTestDto {
  @IsString()
  testName: string;
  difficulty: string;
  topicName: string;
  questions: CreateProblemDto[];
}
