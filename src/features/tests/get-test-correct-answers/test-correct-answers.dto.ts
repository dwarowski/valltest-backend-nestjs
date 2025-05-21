import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CorrectAnswerDto } from './correct-answer.dto';
import { Type } from 'class-transformer';

export class TestCorrectAnswersDto {
  @IsNotEmpty()
  @IsNumber()
  testId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CorrectAnswerDto)
  correctAnswers: CorrectAnswerDto[];
}
