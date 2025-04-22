import { IsNumber } from "class-validator";

export class CorrectAnswersDto {
    @IsNumber()
    testId: number;
    correctAnswers: {
        problemId: number
        answerId: number
    }[];
}