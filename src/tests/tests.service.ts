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
import { TopicsService } from 'src/topics/topics.service';
import { TestTagService } from 'src/test-tag/test-tag.service';

@Injectable()
export class TestsService {
    constructor(
        @Inject(RatingService)
        private readonly ratingService: RatingService,
        @Inject(TopicsService)
        private readonly topicService: TopicsService,        
        @Inject(TestTagService)
        private readonly testTagService: TestTagService,
        @InjectRepository(TestsEntity)
        private repository: Repository<TestsEntity>,
    ) { }

    async getTestById(id: number) {
        return await this.repository.createQueryBuilder('test')
            .where({ id: id })
            .getOne()
    }

    async getTestsByPage(page: number, take: number, filterDto?: TestFilterDto): Promise<PageDto<TestsEntity>> {
        if (isNaN(page) || isNaN(take) || take > 60 || page < 0) {
            throw new BadRequestException('Invalid pagination params')
        }

        const testsQuery = this.repository.createQueryBuilder('tests')
            .skip((page - 1) * take)
            .take(take)
            .leftJoinAndSelect('tests.topic', 'topic')
            .leftJoinAndSelect('topic.subject', 'subject');

        if (filterDto){
            const { subject, topic } = filterDto;
            testsQuery
            .andWhere("topic.topicName  = :topic", { topic })
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
            let averageRating = await this.ratingService.getRatingsByTestId(test.id);
            if (averageRating === 'NaN') {
                averageRating = '0'
            }

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

    async deleteTagByTestId(testId: number, tag: string){

        const tagEntity = await this.testTagService.getTagByName(tag)
        
        if (!tagEntity){
            throw new Error(`tag with name "${tag}" not found`)
        }

        const tagId = tagEntity.tag.id;

        return await this.testTagService.deleteRelationByTestAndTag(testId, tagId)
        
    }
}
