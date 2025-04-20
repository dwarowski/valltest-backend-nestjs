import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ readOnly: true })
  @IsString()
  problem: number;
  @IsString()
  value: string;
  @IsBoolean()
  is_correct: boolean;
}
