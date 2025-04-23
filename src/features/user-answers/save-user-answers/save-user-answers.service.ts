import { Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import { UserAnswersDto } from "./user-answers.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAnswersEntity } from "src/entities/user-answers/user-answer.entity";
import { Repository } from "typeorm";
import { extractTokenFromCookie } from "src/shared/utils/functions/extract-token-from-cookie/token-extract";
import { GetTestsIdService } from "src/features/tests/get-test-id/get-tests-id.service";
import { GetUserService } from "src/features/users/get-user/get-user.service";
import { GetProblemService } from "src/features/problems/get-problem/get-problem.service";
import { GetAnswerService } from "src/features/answers/get-answer/get-answer.service";
import { GetUserTestAnsweresService } from "../get-user-test-answers/get-user-test-answers.service";

@Injectable()
export class SaveUserAnswersService {
    constructor(
        @InjectRepository(UserAnswersEntity)
        private readonly userAnswersRepository: Repository<UserAnswersEntity>,
        @Inject(GetTestsIdService)
        private readonly getTest: GetTestsIdService,
        @Inject(GetUserService)
        private readonly getUser: GetUserService,
        @Inject(GetProblemService)
        private readonly getProblem: GetProblemService,
        @Inject(GetAnswerService)
        private readonly getAnswer: GetAnswerService,
        @Inject(GetUserTestAnsweresService)
        private readonly getUserTestAnwers: GetUserTestAnsweresService,
    ) { }

    async execute(req: Request, dto: UserAnswersDto) {
        const { testId, userAnswers } = dto
        const payload = await extractTokenFromCookie(req)
        const userId = payload.id

        const userEntity = await this.getUser.execute(userId, 'id')
        const testsEntity = await this.getTest.execute(testId, 'entity')

        const checkUserAnswers = await this.getUserTestAnwers.execute(userEntity.id, testsEntity.id)
        if (checkUserAnswers) {
            return 'Вы уже проходили этот тест'
        }

        await Promise.all(userAnswers.map(async (userAnswer) => {
            try {
                const problemEntity = await this.getProblem.execute(userAnswer.problemId)
                const answerEntity = await this.getAnswer.execute(userAnswer.answerId)

                await this.userAnswersRepository.save({
                    user: userEntity,
                    test: testsEntity,
                    problem: problemEntity,
                    answer: answerEntity
                })
            }
            catch (error) {
                throw error
            }
        }))
        return 'answers saved'
    }
}