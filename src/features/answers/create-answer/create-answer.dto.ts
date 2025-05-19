import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  problemId: number;
  @IsNotEmpty()
  @IsString()
  value: string;
  @IsNotEmpty()
  @IsBoolean()
  is_correct: boolean;
}
