import { Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import { GetTestCorrectAnswersService } from "src/features/tests/get-test-correct-answers/get-test-corect-answers.service";
import { extractTokenFromCookie } from "src/shared/utils/functions/extract-token-from-cookie/token-extract";
import { GetUserTestAnsweresService } from "../get-user-test-answers/get-user-test-answers.service";
import { UserAnswersDto } from "../save-user-answers/user-answers.dto";
import { CorrectAnswersDto } from "./correct-answers.dto";

@Injectable()
export class CheckAnswersService {
    constructor(
        @Inject(GetTestCorrectAnswersService)
        private readonly getTestCorrectAnswers: GetTestCorrectAnswersService,
        @Inject(GetUserTestAnsweresService)
        private readonly getUserTestAnswers: GetUserTestAnsweresService
    ) { }

    async execute(req: Request, testId: number) {
        const payload = await extractTokenFromCookie(req)
        const userId = payload.id
        const correctAnswers = await this.getTestCorrectAnswers.execute(testId)
        const userAnswers = await this.getUserTestAnswers.execute(userId, testId)
        const userResult = await this.compareAnswers(userAnswers, correctAnswers)
        return userResult
    }

    private async compareAnswers(userAnswers: UserAnswersDto, correctAnswers: CorrectAnswersDto) {
        let correctCount = 0;
        for (const correct of correctAnswers.correctAnswers) {
            for (const user of userAnswers.userAnswers) {
                if (correct.problemId === user.problemId && correct.answerId === user.answerId) {
                    correctCount++;
                    break;
                }
            }
        }
        return `${correctCount} / ${correctAnswers.correctAnswers.length}`
    }
}