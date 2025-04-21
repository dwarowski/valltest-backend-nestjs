import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { GetTestsIdService } from "../get-test-id/get-tests-id.service";

@Injectable()
export class GetTestCorrectAnswersService {
    constructor(
        @Inject(GetTestsIdService)
        private readonly getTests: GetTestsIdService
    ) {}

    async execute(testId: number) {
        const testEntity = await this.getTests.execute(testId, 'entity')
        const correctAnswers = await Promise.all(testEntity.problems.map(async (problem) => {
            const correctAnswer = problem.answers.find(answer => answer.is_correct);
            if (!correctAnswer) {
                throw new BadRequestException('No Correct Answer???')
            }
            return { problemId: problem.id, answerId: correctAnswer.id }
        }
        ))
        return { testId: testEntity.id, correctAnswers: correctAnswers }
    }
}