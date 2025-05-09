import { IsString } from 'class-validator';

export class ReturnTokensDto {
  @IsString()
  access_token: string;
  @IsString()
  refresh_token: string;
}
