import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  tag: string;
  
  @IsNumber()
  testId: number;
}
