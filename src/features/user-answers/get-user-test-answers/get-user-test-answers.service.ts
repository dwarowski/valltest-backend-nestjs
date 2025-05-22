import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswersEntity } from 'src/entities/user-answers/user-answer.entity';
import { Repository } from 'typeorm';
import { UserAnswersDto } from './user-answers.dto';

@Injectable()
export class GetUserTestAnsweresService {
  constructor(
    @InjectRepository(UserAnswersEntity)
    private readonly userAnswersRepository: Repository<UserAnswersEntity>,
  ) {}

  async execute(userId: string, testId: number): Promise<UserAnswersDto> {
    const userAnswersEnitiy = await this.userAnswersRepository.find({
      where: { user: { id: userId }, test: { id: testId } },
      relations: ['test', 'user', 'problem', 'answer'],
    });

    if (userAnswersEnitiy.length == 0) {
      throw new NotFoundException(
        `No answers found for test with id: ${testId}`,
      );
    }

    const userAnswers = userAnswersEnitiy.map((userAnswer) => ({
      problemId: userAnswer.problem.id,
      answerId: userAnswer.answer.id,
    }));

    return {
      testId: userAnswersEnitiy[0].test.id,
      userAnswers,
    };
  }
}
