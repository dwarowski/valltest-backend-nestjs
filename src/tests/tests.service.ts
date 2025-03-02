import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestsEntity } from './entity/test.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { PageMetaDto } from '../global-dto/get-page/page-meta.dto';
import { PageDto } from '../global-dto/get-page/page.dto';

@Injectable()
export class TestsService {
    constructor(
        @InjectRepository(TestsEntity)
        private repository: Repository<TestsEntity>,
      ) {}

    async getTestsMainPage(page: number, take: number): Promise<PageDto<TestsEntity>> {
        const [tests, total] = await this.repository.createQueryBuilder('tests')
        .skip((page - 1) * take)
        .take(take)
        .getManyAndCount();

        const pageMetaDto = new PageMetaDto({ pageOptionsDto: { page, take }, itemCount: total});

        const pageDto = new PageDto(tests, pageMetaDto);

        return pageDto
    }

    creatTest(dto: CreateTestDto){
        return this.repository.save(dto)
    }
}
