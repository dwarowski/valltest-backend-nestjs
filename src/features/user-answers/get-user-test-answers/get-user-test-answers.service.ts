import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswersEntity } from 'src/entities/user-answers/user-answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetUserTestAnsweresService {
  constructor(
    @InjectRepository(UserAnswersEntity)
    private readonly userAnswersRepository: Repository<UserAnswersEntity>,
  ) {}

  async execute(userId: string, testId: number) {
    const userAnswers = await this.userAnswersRepository.find({
      where: { user: { id: userId }, test: { id: testId } },
      relations: ['test', 'user', 'problem', 'answer'],
    });

    const userAnswersFilterd = await Promise.all(
      userAnswers.map(async (userAnswer) => {
        const { problem, answer } = userAnswer;
        return { problemId: problem.id, answerId: answer.id };
      }),
    );
    if (userAnswers.length == 0) {
      return 'No Answers Found'
    }
    else {
      return { testId: userAnswers[0].test.id, userAnswers: userAnswersFilterd };
    }
   
  }
}
