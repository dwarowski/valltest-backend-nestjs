import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class DeleteTagDto {
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  tag: string;
}
