import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateProblemDto } from 'src/features/problems/create-problem/create-problem.dto';

export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  testName: string;

  @IsString()
  @IsNotEmpty()
  difficulty: string;

  @IsString()
  @IsNotEmpty()
  topicName: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateProblemDto)
  questions: CreateProblemDto[];
}
