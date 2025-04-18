import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsString()
  topicName: string;

  @IsNotEmpty()
  subjectId: number;
}
