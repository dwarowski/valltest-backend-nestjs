import { Get, Post, Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserAnswerDto } from '../../features/users-answers/dto/create-user-answer.dto';
import { UserAnswersService } from '../../features/users-answers/user-answers.service';

@Controller('user-answers')
@ApiTags('user-answers')
export class UserAnswersController {
  constructor(private readonly UserAnswersService: UserAnswersService) {}

  @Get(':id')
  getUserAnswersByUser(@Param('id') id: string) {
    return this.UserAnswersService.getUserAnswersByUser(+id);
  }

  @Post()
  createUserAnswer(@Body() dto: CreateUserAnswerDto) {
    return this.UserAnswersService.createUserAnswer(dto);
  }
}
