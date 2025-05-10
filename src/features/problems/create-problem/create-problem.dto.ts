import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateAnswerDto } from 'src/features/answers/create-answer/create-answer.dto';

export class CreateProblemDto {
  @ApiProperty({ readOnly: true })
  @IsNumber()
  testId: number;
  @IsString()
  question: string;
  @IsNotEmpty()
  answers: CreateAnswerDto[];
}
