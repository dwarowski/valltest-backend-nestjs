import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProblemDto } from 'src/features/problems/create-problem/create-problem.dto';

export class CreateTestDto {
  @IsString()
  testName: string;
  @IsString()
  difficulty: string;
  @IsString()
  topicName: string;
  @IsNotEmpty()
  questions: CreateProblemDto[];
}
