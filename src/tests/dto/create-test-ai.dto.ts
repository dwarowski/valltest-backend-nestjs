import { IsString } from 'class-validator';

export class CreateTestAiDto {
  
  topicId: number
  difficulty: number // Уровень учеников?
  subjectId: number
  @IsString()
  description: string
  @IsString()
  testName: string
  questionsAmount: number
  timeForTest: number
  userAuthorId: number
}
