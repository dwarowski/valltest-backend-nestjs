import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestsService } from 'src/tests/tests.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

import { CreateFavoriteTestDto } from './dto/create-favorite-test.dto';
import { FavoriteTestEntity } from './entity/favorite-test.entity';

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

  getFavTestById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async addTestToFavorite(userId: string, testId: string) {
    const [userEntity, testEntity] = await Promise.all([
      this.userService.findOneById(userId),
      this.testsService.getTestById(+testId),
    ]);

    if (!userEntity) {
      throw new BadRequestException('User not found');
    }

    if (!testEntity) {
      throw new BadRequestException('Test not found');
    }

    if (
      await this.repository.findOne({
        where: {
          user: { id: userId },
          test: { id: +testId },
        },
      })
    ) {
      return new BadRequestException('already in favorite');
    }

    return this.repository.save({
      user: userEntity,
      test: testEntity,
    });
  }

  async removeTestFromFavorite(userId: string, testId: string) {
    const [userEntity, testEntity] = await Promise.all([
      this.userService.findOneById(userId),
      this.testsService.getTestById(+testId),
    ]);

    if (!userEntity) {
      throw new BadRequestException('User not found');
    }

    if (!testEntity) {
      throw new BadRequestException('Test not found');
    }

    if (
      !(await this.repository.findOne({
        where: {
          user: { id: userId },
          test: { id: +testId },
        },
      }))
    ) {
      return new BadRequestException('not in favorite');
    }

    return await this.repository
      .createQueryBuilder('favTest')
      .delete()
      .where({
        user: { id: userId },
        test: { id: +testId },
      })
      .execute();
  }

  async getFavoriteTestsByUser(userId: string) {
    const userEntity = await this.userService.findOneById(userId);

    if (!userEntity) {
      throw new BadRequestException('User not found');
    }

    return await this.repository.find({ where: { user: userEntity } });
  }
}
