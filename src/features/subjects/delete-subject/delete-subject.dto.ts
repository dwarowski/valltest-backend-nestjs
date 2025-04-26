import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteSubjectDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  subjectName: string;
}
