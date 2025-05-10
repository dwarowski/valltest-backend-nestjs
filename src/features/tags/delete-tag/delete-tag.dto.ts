import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class DeleteTagDto {
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().toLowerCase();
    }
    return value;
  })
  tag: string;
}
