import { IsString } from "class-validator";

export class CreateAnswerDto{
    @IsString()
    value: string
    problem: number
    is_correct: boolean
}