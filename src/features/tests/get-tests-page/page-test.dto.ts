import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class PageTestDto {

  @IsNumber()
  @IsOptional()
  @Min(1)
  page: number;

  @IsNumber()
  @IsOptional()
  @Max(60)
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
