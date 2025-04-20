import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { extractTokenFromCookie } from 'src/shared/utils/functions/extract-token-from-cookie/token-extract';

import { CreateTestDto } from './create-test.dto';
import { TestsEntity } from '../../../entities/tests/test.entity';
import { CreateProblemService } from 'src/features/problems/create-problem/create-problems.service';
import { GetTopicService } from '../../topics/get-topic/get-topics.service';

@Injectable()
export class CreateTestsService {
  constructor(
    @Inject(GetTopicService)
    private readonly getTopicService: GetTopicService,
    @Inject(CreateProblemService)
    private readonly createProblemsService: CreateProblemService,
    @InjectRepository(TestsEntity)
    private readonly repository: Repository<TestsEntity>,
  ) { }

  async creatTest(dto: CreateTestDto, req: Request) {
    const { topicName, questions, ...testDto } = dto;

    const payload = await extractTokenFromCookie(req);
    const userAuthorId = payload.id;

    const topic = await this.getTopicService.getTopicByName(topicName);

    const testEntity = await this.repository.save({
      ...testDto,
      userAuthorId,
      topic,
      timeForTest: 2, // placeholder until design updates
    });

    const testQuestions = await Promise.all(
      questions.map(async (question) => {
        question.test = testEntity.id
        const createdProblem = await this.createProblemsService.execute(question);
        return createdProblem;
      }),
    );

    const createdTest = Object.assign(new CreateTestDto(),
    { 
      testName: testEntity.testName, 
      difficulty: testEntity.difficulty, 
      topicName: testEntity.topic.topicName,
      testQuestions
    })
    return createdTest;
  }
}
