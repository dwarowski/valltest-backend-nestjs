import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Body,
    Controller, 
    Param,
    ParseIntPipe,
    Query
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';

@Controller('problems')
@ApiTags('problems')
export class ProblemsController {
    constructor(private readonly ProblemService: ProblemsService) {}

    @Get()
    getProblem(){
        return this.ProblemService.getProblem();
    }

    @Post()
    createProblem(@Query('testId') testId: string, @Body() dto: CreateProblemDto){
        return this.ProblemService.createProblem(+testId, dto);
    }

}

