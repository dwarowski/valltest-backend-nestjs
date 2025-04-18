import { IsString } from 'class-validator';

export class roleDto {
  @IsString()
  role: string;
  @IsString()
  user: string;
}
