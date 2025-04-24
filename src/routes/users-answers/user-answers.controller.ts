import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CheckAnswersService } from 'src/features/user-answers/check-user-answers/check-answers.serivce';
import { SaveUserAnswersService } from 'src/features/user-answers/save-user-answers/save-user-answers.service';
import { UserAnswersDto } from 'src/features/user-answers/save-user-answers/user-answers.dto';
import { Roles } from 'src/shared/utils/decorators/roles-decorator';

@ApiTags('UsersAnswers')
@Controller('user-answers')
export class UserAnswersController {
  constructor(
    @Inject(CheckAnswersService)
    private readonly checkUserAnswersService: CheckAnswersService,
    @Inject(SaveUserAnswersService)
    private readonly saveUserAnswersService: SaveUserAnswersService,
  ) {}

  @Roles('student')
  @Post()
  async saveUserAnswers(@Req() req: Request, @Body() dto: UserAnswersDto) {
    return this.saveUserAnswersService.execute(req, dto);
  }

  @Roles('student')
  @Get(':id')
  async checkUserAnswers(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.checkUserAnswersService.execute(req, id);
  }
}
