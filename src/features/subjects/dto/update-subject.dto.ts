import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subjectName?: string;
}
