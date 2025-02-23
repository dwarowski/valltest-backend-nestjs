import { ApiTags } from '@nestjs/swagger';

import {
    Controller,
    Get,
    Param 
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

}
