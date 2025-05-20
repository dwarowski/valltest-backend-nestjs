import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { extractToken } from 'src/shared/utils/functions/extract-token/token-extract';

import { CreateTestDto } from './create-test.dto';
import { TestsEntity } from '../../../entities/tests/test.entity';
import { CreateProblemService } from 'src/features/problems/create-problem/create-problems.service';
import { GetTopicService } from '../../topics/get-topic/get-topics.service';
import { GetUserService } from 'src/features/users/get-user/get-user.service';

@Injectable()
export class CreateTestsService {
  constructor(
    @Inject(GetTopicService)
    private readonly getTopic: GetTopicService,
    @Inject(CreateProblemService)
    private readonly createProblem: CreateProblemService,
    @Inject(GetUserService)
    private readonly getUser: GetUserService,
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) {}

  async execute(dto: CreateTestDto, req: Request) {
    const { topicName, questions, ...testDto } = dto;

    const payload = await extractToken(req);
    const userId = payload.id;

    const userEntity = await this.getUser.execute(userId, 'id');
    const topic = await this.getTopic.execute({ topicName });

    const testEntity = await this.testsRepository.save({
      ...testDto,
      userAuthor: userEntity,
      topic,
      timeForTest: 60 * 60, // placeholder until design updates
    });

    const testQuestions = await Promise.all(
      questions.map(async (question) => {
        question.testId = testEntity.id;
        const createdProblem = await this.createProblem.execute(question);
        return createdProblem;
      }),
    );

    return testQuestions;
  }
}
