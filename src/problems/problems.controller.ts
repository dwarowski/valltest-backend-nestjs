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
    constructor(private readonly ProblemService: ProblemsService) {}

    @Get()
    getProblem(){
        return this.ProblemService.getProblem();
    }

    @Post()
    createProblem(@Body() dto: CreateProblemDto){
        return this.ProblemService.createProblem(dto);
    }

}

