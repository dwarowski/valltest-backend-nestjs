import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from 'src/features/answers/create-answer/create-answer.dto';

export class CreateProblemDto {
  @IsNotEmpty()
  @IsNumber()
  testId: number;

  @IsNotEmpty()
  @IsString()
  question: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  @IsNotEmpty()
  answers: CreateAnswerDto[];
}
