import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GetTestCorrectAnswersService } from 'src/features/tests/get-test-correct-answers/get-test-corect-answers.service';
import { extractToken } from 'src/shared/utils/functions/extract-token/token-extract';
import { GetUserTestAnsweresService } from '../get-user-test-answers/get-user-test-answers.service';
import { UserAnswersDto } from '../get-user-test-answers/user-answers.dto';
import { UserResult } from './user-result.dto';
import { TestCorrectAnswersDto } from 'src/features/tests/get-test-correct-answers/test-correct-answers.dto';

@Injectable()
export class CheckAnswersService {
  constructor(
    @Inject(GetTestCorrectAnswersService)
    private readonly getTestCorrectAnswers: GetTestCorrectAnswersService,
    @Inject(GetUserTestAnsweresService)
    private readonly getUserTestAnswers: GetUserTestAnsweresService,
  ) {}

  async execute(req: Request, testId: number): Promise<UserResult> {
    const payload = await extractToken(req);
    const userId = payload.id;
    const [correctAnswers, userAnswers] = await Promise.all([
      this.getTestCorrectAnswers.execute(testId),
      this.getUserTestAnswers.execute(userId, testId),
    ]);
    const userResult = this.compareAnswers(userAnswers, correctAnswers);
    return userResult;
  }

  private compareAnswers(
    userAnswersDto: UserAnswersDto,
    correctAnswersDto: TestCorrectAnswersDto,
  ): UserResult {
    // Создаем Map для правильных ответов: ключ — problemId, значение — answerId
    const correctAnswersMap = new Map<number, number>();
    for (const correct of correctAnswersDto.correctAnswers) {
      correctAnswersMap.set(correct.problemId, correct.answerId);
    }

    // Создаем Map для ответов пользователя: ключ — problemId, значение — answerId
    const userAnswersMap = new Map<number, number>();
    for (const user of userAnswersDto.userAnswers) {
      userAnswersMap.set(user.problemId, user.answerId);
    }

    // Подсчет правильных ответов
    let correctCount = 0;
    for (const [problemId, answerId] of correctAnswersMap.entries()) {
      if (userAnswersMap.get(problemId) === answerId) {
        correctCount++;
      }
    }

    return {
      score: correctCount,
      total: correctAnswersDto.correctAnswers.length,
    };
  }
}
