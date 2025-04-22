import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAnswersEntity } from "src/entities/user-answers/user-answer.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetUserTestAnsweresService {
    constructor(
        @InjectRepository(UserAnswersEntity)
        private readonly userAnswersRepository: Repository<UserAnswersEntity>
    ) { }

    async execute(userId: string) {
        const userAnswers = await this.userAnswersRepository.find({
            where: { user: { id: userId } },
            relations: ['test', 'user', 'problem', 'answer'],
        });
        const userAnswersFilterd = await Promise.all(userAnswers.map(async (userAnswer) => {
            const { problem, answer } = userAnswer
            return { problemId: problem.id, answerId: answer.id }
        }))
        return { testId: userAnswers[0].test.id, userAnswers: userAnswersFilterd }
    }
}