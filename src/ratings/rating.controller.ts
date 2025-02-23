import { ApiTags } from '@nestjs/swagger';

import { 
    Controller,
    Get,
    Param } from '@nestjs/common';
import { RatingService } from './rating.service';

@ApiTags('rating')
@Controller('rating')
export class RatingController {

    constructor(private readonly testFavService: RatingService ) {}
    @Get(':id')
    getSubject(@Param('id') id: string){
        return this.testFavService.getRatingById(+id);
    }

}
