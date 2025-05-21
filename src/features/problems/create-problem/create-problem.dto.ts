import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from 'src/features/answers/create-answer/create-answer.dto';

export class CreateProblemDto {
  @ApiHideProperty()
  @IsNotEmpty()
  @IsNumber()
  testId: number;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}
