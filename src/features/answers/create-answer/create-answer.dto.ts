import { ApiHideProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiHideProperty()
  @IsEmpty()
  problemId: number;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsBoolean()
  is_correct: boolean;
}
