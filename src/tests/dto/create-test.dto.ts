import { IsString } from 'class-validator';

export class CreateTestDto {
  difficulty: number
  @IsString()
  testName: string
  timeForTest: number
  userAuthorId: number
  topic: number
}
