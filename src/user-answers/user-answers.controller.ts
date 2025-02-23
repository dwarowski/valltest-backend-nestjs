import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Body,
    Controller, 
    Param
} from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';

@Controller('user-answers')
@ApiTags('user-answwers')
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
