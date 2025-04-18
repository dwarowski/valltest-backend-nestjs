import {
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsInt()
  testId: number; // ID теста

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number; // Оценка от 1 до 5

  @IsOptional()
  @IsString()
  comment?: string; // Комментарий (необязательный)
}
