import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Body,
    Controller,
    Query,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

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
}
