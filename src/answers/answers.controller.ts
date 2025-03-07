import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Body,
    Controller,
    Query,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
@ApiTags('answers')
export class AnswersController {
    constructor(private readonly AnswersService: AnswersService) {}

    @Get()
    getAnswers() {
        return this.AnswersService.getAnswers();
    }

    @Post()
    createAnswer(@Query('problemId') problemId: string, @Body() dto: CreateAnswerDto) {
        return this.AnswersService.createAnswer(+problemId, dto);
    }

    @Delete()
        deleteProblem(@Param('id') id: string){
                return this.AnswersService.deleteAnswer(+id);
    }
    @Patch()
        updateProblem(@Param('id') id: string, @Body() dto: UpdateAnswerDto){
            return this.AnswersService.updateProblem(+id, dto);
    }
}
