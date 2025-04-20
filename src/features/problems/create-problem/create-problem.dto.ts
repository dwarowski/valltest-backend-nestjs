import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateAnswerDto } from 'src/features/answers/create-answer/create-answer.dto';

export class CreateProblemDto {
  @ApiProperty({readOnly: true})
  @IsNumber()
  test: number
  @IsString()
  question: string;

  answers: CreateAnswerDto[]
}
