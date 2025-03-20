import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  subjectName: string;
}
