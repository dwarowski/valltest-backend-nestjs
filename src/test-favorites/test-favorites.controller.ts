import { ApiTags } from '@nestjs/swagger';

import {
    Controller,
    Get,
    Param, 
    Post
} from '@nestjs/common';
import { TestFavoritesService } from './test-favorites.service';

@ApiTags('test-favorites')
@Controller('test-favorites')
export class TestFavoritesController {

    constructor(private readonly testFavService: TestFavoritesService ) {}
    @Get(':id')
    getFavTestById(@Param('id') id: string){
        return this.testFavService.getFavTestById(+id);
    }

    @Post(':testId')
    addToFavorite(@Param('testId') testId: string){
        return this.testFavService.addTestToFavorite('1', testId)
    }

}
