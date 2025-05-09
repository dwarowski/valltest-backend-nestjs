import { IsString, IsUUID } from 'class-validator';

export class RemoveRoleDto {
  @IsString()
  role: string;
  @IsUUID()
  userId: string;
}
