import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTopicDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  topicName: string;
}
