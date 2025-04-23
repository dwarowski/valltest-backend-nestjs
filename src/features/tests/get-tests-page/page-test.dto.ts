import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class PageTestDto {

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Max(60)
  @Type(() => Number)
  take: number;

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
