import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional() // Поле необязательное
  @IsString() // Должно быть строкой
  @MinLength(2, { message: 'Name must be at least 2 characters long' }) // Минимальная длина
  @MaxLength(50, { message: 'Name must be no longer than 50 characters' }) // Максимальная длина
  name?: string;

  @IsOptional() // Поле необязательное
  @IsEmail({}, { message: 'Invalid email format' }) // Должно быть валидным email
  email?: string;
}
