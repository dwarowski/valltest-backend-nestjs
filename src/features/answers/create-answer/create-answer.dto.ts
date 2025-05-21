import { ApiHideProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiHideProperty()
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
