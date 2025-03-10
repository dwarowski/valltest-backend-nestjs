import { IsString } from "class-validator";

export class CreateAnswerDto{
    @IsString()
    value: string
    is_correct: boolean
}