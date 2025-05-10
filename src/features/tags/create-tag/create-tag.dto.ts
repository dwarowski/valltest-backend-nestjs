import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().toLowerCase();
    }
    return value;
  })
  tag: string;

  @IsNumber()
  testId: number;
}
