import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from 'src/features/answers/create-answer/create-answer.dto';

export class CreateProblemDto {
  @ApiHideProperty()
  @IsEmpty()
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
