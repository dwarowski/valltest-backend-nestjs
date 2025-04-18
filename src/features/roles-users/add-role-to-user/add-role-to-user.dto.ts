import { IsString } from 'class-validator';

export class AddRoleToUserDto {
  @IsString()
  role: string;
  @IsString()
  user: string;
}
