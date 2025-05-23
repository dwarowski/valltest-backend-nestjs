import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  oldPassword: string; // Старый пароль

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' }) // Минимальная длина
  @MaxLength(50, { message: 'Password must be no longer than 50 characters' }) // Максимальная длина
  newPassword: string; // Новый пароль
}
