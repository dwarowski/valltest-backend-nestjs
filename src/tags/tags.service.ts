import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsEntity } from './entity/tags.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { TestsService } from 'src/tests/tests.service';
import { TestTagEntity } from './entity/test-tag.entity';

@Injectable()
export class TagsService {
    constructor(
        @Inject(TestsService)
        private testsService: TestsService,
        @InjectRepository(TagsEntity)
        private repository: Repository<TagsEntity>,
        @InjectRepository(TestTagEntity)
        private testTagRepository: Repository<TestTagEntity>,
    ) { }

    getTags() {
        return this.repository.find()
    }

    async createTag(dto: CreateTagDto) {
        const { tag, testId } = dto;
        const test = await this.testsService.getTestById(testId)
        if (!test) {
            throw new BadRequestException()
        }
        const tags = await this.repository.save({
            tag
        })
        return await this.testTagRepository.save({
          test,
          tag: tags
        })

        
    }

    async deleteTagById(id: number) {
        return await this.repository.createQueryBuilder('deleteTag')
            .delete()
            .where({ id: id })
            .execute();
    }
}
