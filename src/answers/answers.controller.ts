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
import { ApiTags } from '@nestjs/swagger';

import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
@ApiTags('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  getAnswers() {
    return this.answersService.getAnswers();
  }

  @Post()
  createAnswer(
    @Query('problemId') problemId: string,
    @Body() dto: CreateAnswerDto,
  ) {
    return this.answersService.createAnswer(+problemId, dto);
  }

  @Delete()
  deleteProblem(@Param('id') id: string) {
    return this.answersService.deleteAnswer(+id);
  }
  @Patch()
  updateProblem(@Param('id') id: string, @Body() dto: UpdateAnswerDto) {
    return this.answersService.updateProblem(+id, dto);
  }
}
