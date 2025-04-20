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
    private readonly getTopic: GetTopicService,
    @Inject(CreateProblemService)
    private readonly createProblem: CreateProblemService,
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
  ) { }

  async execute(dto: CreateTestDto, req: Request) {
    const { topicName, questions, ...testDto } = dto;

    const payload = await extractTokenFromCookie(req);
    const userAuthorId = payload.id;

    const topic = await this.getTopic.execute(topicName);

    const testEntity = await this.testsRepository.save({
      ...testDto,
      userAuthorId,
      topic,
      timeForTest: 2, // placeholder until design updates
    });

    const testQuestions = await Promise.all(
      questions.map(async (question) => {
        question.test = testEntity.id
        const createdProblem = await this.createProblem.execute(question);
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
