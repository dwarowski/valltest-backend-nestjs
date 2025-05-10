import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteSubjectDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().toLowerCase();
    }
    return value;
  })
  subjectName: string;
}
