import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetTopicDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  topicName: string;
}
