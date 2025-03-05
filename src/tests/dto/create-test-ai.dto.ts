import { IsString } from 'class-validator';

export class CreateTestAiDto {
  
  topic: number
  difficulty: number // Уровень учеников?
  @IsString()
  description: string
  @IsString()
  testName: string
  questionsAmount: number
  timeForTest: number
  userAuthorId: number
}
