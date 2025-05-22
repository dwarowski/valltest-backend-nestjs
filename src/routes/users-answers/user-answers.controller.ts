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
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CheckAnswersService } from 'src/features/user-answers/check-user-answers/check-answers.serivce';
import { UserResult } from 'src/features/user-answers/check-user-answers/user-result.dto';
import { SaveUserAnswersService } from 'src/features/user-answers/save-user-answers/save-user-answers.service';
import { UserAnswersDto } from 'src/features/user-answers/get-user-test-answers/user-answers.dto';
import { Roles } from 'src/shared/utils/decorators/roles-decorator';

@ApiTags('User')
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
  @ApiOperation({
    summary: 'Save user answers',
    description: 'Save user answers',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  async saveUserAnswers(@Req() req: Request, @Body() dto: UserAnswersDto) {
    return this.saveUserAnswersService.execute(req, dto);
  }

  @Roles('student')
  @Get(':id')
  @ApiOperation({
    summary: 'User answers for test',
    description: 'Check user answers for completed test',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  async checkUserAnswers(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResult> {
    return await this.checkUserAnswersService.execute(req, id);
  }
}
