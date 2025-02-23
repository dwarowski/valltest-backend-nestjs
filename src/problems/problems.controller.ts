import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Body,
    Controller 
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';

@Controller('tags')
@ApiTags('tags')
export class ProblemsController {
    constructor(private readonly SubjectsService: ProblemsService) {}

    @Get()
    getTags(){
        return this.SubjectsService.getTags();
    }

    @Post()
    createTag(@Body() dto: CreateProblemDto){
        return this.SubjectsService.createTag(dto);
    }

}

