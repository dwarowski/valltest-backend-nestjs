import { IsString } from "class-validator";

export class removeRelationDto {
    @IsString()
    role: string;
    @IsString()
    user: string;

}