import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class DeleteTagDto {
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  tag: string;
}
