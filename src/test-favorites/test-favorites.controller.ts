import { ApiTags } from '@nestjs/swagger';

import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TestFavoritesService } from './test-favorites.service';

@ApiTags('test-favorites')
@Controller('test-favorites')
export class TestFavoritesController {
  constructor(private readonly testFavService: TestFavoritesService) {}
  @Get(':testId')
  getFavTestById(@Param('testId') id: string) {
    return this.testFavService.getFavTestById(+id);
  }

  @Post(':testId')
  addToFavorite(@Param('testId') testId: string) {
    // TODO Добавить получение uuid через request пользователя
    return this.testFavService.addTestToFavorite(
      '9a730553-2eeb-4602-8021-f1e5aa978b0a',
      testId,
    );
  }

  @Delete(':testId')
  removeTestFromFavorite(@Param('testId') testId: string) {
    // TODO Добавить получение uuid через request пользователя
    return this.testFavService.removeTestFromFavorite(
      '9a730553-2eeb-4602-8021-f1e5aa978b0a',
      testId,
    );
  }

  @Get('users/:userId')
  getFavoriteTestByUser(@Param('userId') userId: string) {
    // TODO Добавить получение uuid через request пользователя
    return this.testFavService.getFavoriteTestsByUser(userId);
  }
}
