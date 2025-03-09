import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsEntity } from './entity/tags.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { TestsService } from 'src/tests/tests.service';

@Injectable()
export class TagsService {
    constructor(
        @Inject(TestsService)
        private testsService: TestsService,
            @InjectRepository(TagsEntity)
            private repository: Repository<TagsEntity>,
          ) {}
          
    getTags(){
        return this.repository.find()
    }

    async createTag(dto: CreateTagDto){
        const { tag, testId } = dto;
        const test = await this.testsService.getTestById(testId)
        if (!test){
            throw new BadRequestException()
        }

        return this.repository.save({
            tag,
            test: test
        }
        )
    }
}
