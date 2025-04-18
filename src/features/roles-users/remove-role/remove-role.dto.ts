import { IsString } from 'class-validator';

export class RemoveRoleDto {
  @IsString()
  role: string;
  @IsString()
  user: string;
}
