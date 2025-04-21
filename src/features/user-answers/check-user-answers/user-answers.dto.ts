import { IsNumber } from "class-validator";

export class UserAnswersDto {
    @IsNumber()
    testId: number;
    userAnswers: {
        problemId: number
        answerId: number
    }[];
}