import { IsOptional, IsString } from 'class-validator';

export class TestFilterDto {
  @IsString()
  @IsOptional()
  subject: string;

  @IsOptional()
  @IsString()
  topic: string;

  @IsOptional()
  @IsString()
  tag: string;
}
