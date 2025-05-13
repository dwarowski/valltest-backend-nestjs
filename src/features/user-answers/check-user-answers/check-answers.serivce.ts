import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { GetTestCorrectAnswersService } from 'src/features/tests/get-test-correct-answers/get-test-corect-answers.service';
import { extractToken } from 'src/shared/utils/functions/extract-token/token-extract';
import { GetUserTestAnsweresService } from '../get-user-test-answers/get-user-test-answers.service';
import { UserAnswersDto } from '../save-user-answers/user-answers.dto';
import { CorrectAnswersDto } from './correct-answers.dto';
import { UserResult } from './user-result.dto';

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
    const correctAnswers = await this.getTestCorrectAnswers.execute(testId);
    const userAnswers = await this.getUserTestAnswers.execute(userId, testId);

    if (userAnswers == 'No Answers Found') {
      throw new NotFoundException(userAnswers);
    }

    const userResult = await this.compareAnswers(userAnswers, correctAnswers);
    return userResult;
  }

  private async compareAnswers(
    userAnswersDto: UserAnswersDto,
    correctAnswersDto: CorrectAnswersDto,
  ): Promise<UserResult> {
    let correctCount = 0;
    for (const correct of correctAnswersDto.correctAnswers) {
      for (const user of userAnswersDto.userAnswers) {
        if (
          correct.problemId === user.problemId &&
          correct.answerId === user.answerId
        ) {
          correctCount++;
          break;
        }
      }
    }
    return {
      score: correctCount,
      total: correctAnswersDto.correctAnswers.length,
    };
  }
}
