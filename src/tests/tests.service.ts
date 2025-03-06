import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from './entity/test.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { PageMetaDto } from '../global-dto/get-page/page-meta.dto';
import { PageDto } from '../global-dto/get-page/page.dto';
import { RatingService } from 'src/ratings/rating.service';

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
            return await this.repository.createQueryBuilder('test')
            .delete()
            .where({id: id})
            .execute();
    }
}
