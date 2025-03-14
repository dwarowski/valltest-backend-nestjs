import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from './entity/test.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { PageMetaDto } from '../global-dto/get-page/page-meta.dto';
import { PageDto } from '../global-dto/get-page/page.dto';
import { RatingService } from 'src/ratings/rating.service';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestFilterDto } from './dto/test-filter.dto';
import { TopicService } from 'src/topics/topics.service';

@Injectable()
export class TestsService {
    constructor(
        @Inject(RatingService)
        private readonly ratingService: RatingService,
        @InjectRepository(TestsEntity)
        private repository: Repository<TestsEntity>,
        @Inject(TopicService)
        private readonly topicService: TopicService
    ) { }

    async getTestById(id: number) {
        return await this.repository.createQueryBuilder('test')
            .where({ id: id })
            .getOne()
    }

    async getTestsByPage(page: number, take: number, filterDto: TestFilterDto): Promise<PageDto<TestsEntity>> {
        if (isNaN(page) || isNaN(take) || take > 60 || page < 0) {
            throw new BadRequestException('Invalid pagination params')
        }

        const testsQuery = this.repository.createQueryBuilder('tests')
            .skip((page - 1) * take)
            .take(take)
            .leftJoinAndSelect('tests.topic', 'topic')
            .leftJoinAndSelect('topic.subject', 'subject');

        const { subject, topic } = filterDto;

        if (topic) {
            testsQuery
                .andWhere("topic.topicName  = :topic", { topic })
        }

        if (subject) {
            testsQuery
                .andWhere("subject.subjectName  = :subject", { subject })
        }

        const [tests, total] = await testsQuery.getManyAndCount();

        const testsWithRating = this.addAverageRatingToTests(tests);

        const pageMetaDto = new PageMetaDto({ pageOptionsDto: { page, take }, itemCount: total });

        const pageDto = new PageDto(await testsWithRating, pageMetaDto);

        return pageDto
    }

    async addAverageRatingToTests(tests: TestsEntity[]): Promise<TestsEntity[]> {
        return Promise.all(tests.map(async test => {
            const averageRating = await this.ratingService.getAverageRating(test.id);

            return {
                ...test,
                averageRating: averageRating,
            };
        }));
    }

    async creatTest(dto: CreateTestDto) {
        const { testName, userAuthorId, difficulty, topicId, timeForTest } = dto;

        const topic = await this.topicService.getTopicById(topicId);

        if (!topic) {
            throw new Error(`Topic with ID ${topicId} not found`);
        }
        return await this.repository.save({
            testName,
            userAuthorId,
            difficulty,
            topic: topic,
            timeForTest
        })
    }

    async deleteTest(id: number) {
        return await this.repository.createQueryBuilder('testDelete')
            .delete()
            .where({ id: id })
            .execute();
    }

    async updateTest(id: number, dto: UpdateTestDto) {
        try {
            const { testName, userAuthorId, difficulty, topicId, timeForTest } = dto;

            if (!topicId) {
                throw new BadRequestException('topicId is required');
            }

            const topic = await this.topicService.getTopicById(topicId)

            if (!topic) {
                throw new Error(`Topic with ID ${topicId} not found`);
            }

            const result = await this.repository.createQueryBuilder('testUpdate')
                .update(TestsEntity)
                .set({
                    testName,
                    userAuthorId,
                    difficulty,
                    topic: topic,
                    timeForTest
                })
                .where({ id: id })
                .execute()
            if (result.affected === 0) {
                throw new NotFoundException(`Запись с ID ${id} не найдена`);
            }
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            } else if (error.code === '23503') { // Специфичная проверка кода ошибки
                throw new BadRequestException(`Нарушение ограничения внешнего ключа: ${error.detail}`);
            } else {
                console.error('Ошибка при обновлении записи:', error);
                throw new InternalServerErrorException('Ошибка сервера');
            }
        }
    }
}
