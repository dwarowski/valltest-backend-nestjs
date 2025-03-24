import { IsString } from "class-validator";

export class assignRoleDto {
    @IsString()
    role: string;
    @IsString()
    user: string;
}