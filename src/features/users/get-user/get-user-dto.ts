import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  avatar_location: string | null;
}
