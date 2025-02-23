import { IsString } from 'class-validator';

export class CreateTestDto {
  @IsString()
  testName: string
  userAuthorId: number
  difficulty: number
  topicId: number 
  timeForTest: number
}
