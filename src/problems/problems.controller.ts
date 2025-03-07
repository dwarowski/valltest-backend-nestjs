import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Body,
    Controller,
    Query,
    Delete,
    Patch,
    Param
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

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

    @Delete()
    deleteProblem(@Param('id') id: string){
            return this.ProblemService.deleteProblem(+id);

    }

    @Patch()
    updateProblem(@Param('id') id: string, @Body() dto: UpdateProblemDto){
        return this.ProblemService.updateProblem(+id, dto);
    }

}

