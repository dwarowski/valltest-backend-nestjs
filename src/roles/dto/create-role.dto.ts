import { IsString } from 'class-validator';

export class createRoleDto {
  @IsString()
  role: string;
}
