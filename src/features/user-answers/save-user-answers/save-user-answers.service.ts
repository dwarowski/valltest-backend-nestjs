import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { UserAnswersDto } from '../get-user-test-answers/user-answers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswersEntity } from 'src/entities/user-answers/user-answer.entity';
import { Repository } from 'typeorm';
import { extractToken } from 'src/shared/utils/functions/extract-token/token-extract';
import { GetTestsIdService } from 'src/features/tests/get-test-id/get-tests-id.service';
import { GetUserService } from 'src/features/users/get-user/get-user.service';
import { GetProblemService } from 'src/features/problems/get-problem/get-problem.service';
import { GetAnswerService } from 'src/features/answers/get-answer/get-answer.service';
import { GetUserTestAnsweresService } from '../get-user-test-answers/get-user-test-answers.service';
import { TestsEntity } from 'src/entities/tests/test.entity';
import { User } from 'src/entities/users/user.entity';

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
  ) {}

  async execute(req: Request, dto: UserAnswersDto): Promise<void> {
    const { testId, userAnswers } = dto;
    const payload = await extractToken(req);
    const userId = payload.id;

    // Получение пользователя и теста
    const [userEntity, testsEntity] = await Promise.all([
      this.getUser.execute(userId, 'id'),
      this.getTest.execute(testId),
    ]);

    const checkUserAnswers = await this.CheckUserAnswers(
      userEntity,
      testsEntity,
    );

    // Trying to find exsiting answers
    const existingAnswers = checkUserAnswers
      ? await this.userAnswersRepository.find({
          where: {
            user: { id: userEntity.id },
            test: { id: testsEntity.id },
          },
          relations: ['problem', 'answer', 'user', 'test'],
        })
      : [];

    // Создаем карту существующих ответов для быстрого поиска
    const existingAnswersMap = new Map<number, UserAnswersEntity>();
    existingAnswers.forEach((ans) => {
      existingAnswersMap.set(ans.problem.id, ans);
    });

    await Promise.all(
      userAnswers.map(async (userAnswer) => {
        const [problemEntity, answerEntity] = await Promise.all([
          this.getProblem.execute(userAnswer.problemId),
          this.getAnswer.execute(userAnswer.answerId),
        ]);

        const existingAnswer = existingAnswersMap.get(problemEntity.id);

        if (existingAnswer) {
          // Обновляем существующий ответ, если он отличается
          if (existingAnswer.answer.id !== answerEntity.id) {
            existingAnswer.answer = answerEntity;
            await this.userAnswersRepository.save(existingAnswer);
          }
        } else {
          // Создаем новый ответ
          await this.userAnswersRepository.save({
            user: userEntity,
            test: testsEntity,
            problem: problemEntity,
            answer: answerEntity,
          });
        }
      }),
    );
  }

  private async CheckUserAnswers(
    userEntity: User,
    testsEntity: TestsEntity,
  ): Promise<UserAnswersDto | null> {
    let checkUserAnswers: UserAnswersDto | null = null;
    try {
      checkUserAnswers = await this.getUserTestAnwers.execute(
        userEntity.id,
        testsEntity.id,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        checkUserAnswers = null;
      } else {
        throw error;
      }
    }
    return checkUserAnswers;
  }
}
