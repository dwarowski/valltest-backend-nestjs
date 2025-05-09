import { IsString, IsUUID } from 'class-validator';

export class AddRoleToUserDto {
  @IsString()
  role: string;
  @IsUUID()
  user: string;
}
