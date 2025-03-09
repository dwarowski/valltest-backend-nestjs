import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateTopicDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  topicName?: string;

  @IsOptional()
  subjectId?: number; // ID предмета, к которому относится тема (необязательное поле)
}