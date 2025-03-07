import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from './entity/test.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { PageMetaDto } from '../global-dto/get-page/page-meta.dto';
import { PageDto } from '../global-dto/get-page/page.dto';
import { RatingService } from 'src/ratings/rating.service';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestsService {
    constructor(
        @Inject(RatingService) private readonly ratingService: RatingService,
        @InjectRepository(TestsEntity)
        private repository: Repository<TestsEntity>,
      ) {}

    async getTestById(id: number){
        console.log(id);
        return await this.repository.createQueryBuilder('test')
        .where({id: id})
        .getOne()
    }

    async getTestsPage(page: number, take: number): Promise<PageDto<TestsEntity>> {
        const [tests, total] = await this.repository.createQueryBuilder('tests')
        .skip((page - 1) * take)
        .take(take)
        .getManyAndCount();

        const testsWithRating = this.addAverageRatingToTests(tests);

        const pageMetaDto = new PageMetaDto({ pageOptionsDto: { page, take }, itemCount: total});

        const pageDto = new PageDto(await testsWithRating, pageMetaDto);

        return pageDto
    }

    async addAverageRatingToTests(tests: TestsEntity[]): Promise<TestsEntity[]> {
        return Promise.all(tests.map(async test => {
            let averageRating  = await this.ratingService.getRatingsByTestId(test.id);
            if (averageRating === 'NaN'){
                averageRating = '0'
            }

            return {
              ...test,
              averageRating: averageRating,
            };
          }));
    }

    creatTest(dto: CreateTestDto){
        return this.repository.save(dto)
    }

    async deleteTest(id: number){
            return await this.repository.createQueryBuilder('testDelete')
            .delete()
            .where({id: id})
            .execute();
    }

    async updateTest(id: number, dto: UpdateTestDto){
        try {
            const result = await this.repository.createQueryBuilder('testUpdate')
            .update(TestsEntity)
            .set(dto)
            .where({id: id})
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
