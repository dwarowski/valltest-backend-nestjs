import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Body,
    Controller 
} from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';

@Controller('user-answers')
@ApiTags('user-answwers')
export class UserAnswersController {
    constructor(private readonly UserAnswersService: UserAnswersService) {}

    @Get()
    getUserAnswersByUser() {
        return this.UserAnswersService.getUserAnswersByUser();
    }

    @Post()
    createUserAnswer(@Body() dto: CreateUserAnswerDto) {
        return this.UserAnswersService.createUserAnswer(dto);
    }

}
