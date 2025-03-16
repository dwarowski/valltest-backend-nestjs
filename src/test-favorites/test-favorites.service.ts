import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FavoriteTestEntity } from './entity/favorite-test.entity';
import { UserService } from 'src/user/user.service';
import { TestsService } from 'src/tests/tests.service';

@Injectable()
export class TestFavoritesService {
    constructor(
            @Inject(TestsService)
            private readonly testsService: TestsService,
            @Inject(UserService)
            private readonly userService: UserService,
            @InjectRepository(FavoriteTestEntity)
            private repository: Repository<FavoriteTestEntity>,
          ) {}

    getFavTestById(id: number){
        return this.repository.findOneBy({ id })
    }

    async addTestToFavorite(userId: string, testId: string){
        const userEntity = this.userService.findOneById(userId)
        if (!userEntity) {
            throw new BadRequestException('User not found')
        }

        const testEntity = this.testsService.getTestById(+testId)
        if (!testEntity) {
            throw new BadRequestException('Test not found')
        }
    }
}
