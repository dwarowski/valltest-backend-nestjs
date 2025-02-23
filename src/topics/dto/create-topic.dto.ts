import { IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  topicName: string
  subjectId: number
}
