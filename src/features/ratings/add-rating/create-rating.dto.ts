import {
  IsNotEmpty,
  Min,
  Max,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  testId: number; // ID теста

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number; // Оценка от 1 до 5

  @IsOptional()
  @IsString()
  comment?: string; // Комментарий (необязательный)
}
