import { IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  subjectName: string
}
