import {
  Get,
  Post,
  Controller,
  Body,
  Query,
  ParseIntPipe,
  Param,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { Roles } from 'src/shared/utils/decorators/roles-decorator';

import { CreateTestDto } from '../../features/tests/create-test/create-test.dto';
import { PageTestDto } from '../../features/tests/get-tests-page/page-test.dto';
import { GetTestsPageService } from 'src/features/tests/get-tests-page/get-tests-page.service';
import { GetTestsIdService } from 'src/features/tests/get-test-id/get-tests-id.service';
import { CreateTestsService } from 'src/features/tests/create-test/create-tests.service';
import { GetUsersTestsService } from 'src/features/tests/get-test-user/get-user-tests.service';

@Controller('tests')
@ApiTags('Test')
export class TestsController {
  constructor(
    private readonly getTestsByPageService: GetTestsPageService,
    private readonly getTestByIdService: GetTestsIdService,
    private readonly createTestService: CreateTestsService,
    private readonly getTestByUser: GetUsersTestsService,
  ) {}

  @ApiOperation({
    summary: 'Tests page',
    description: 'Get tests by page defining page, take, subject, topic, tag',
  })
  @Get()
  getTests(@Query() dto: PageTestDto) {
    return this.getTestsByPageService.execute(dto);
  }

  @ApiOperation({
    summary: 'Get test by id',
    description: 'Get test by id for user to complete it',
  })
  @Get('test/:id')
  getTestById(@Param('id', ParseIntPipe) testId: number) {
    return this.getTestByIdService.execute(testId);
  }

  @ApiOperation({
    summary: 'Create test',
    description: 'Create test and there should be at least one correct answer',
  })
  @Post('test')
  @ApiBearerAuth()
  @ApiCookieAuth()
  createTest(@Body() dto: CreateTestDto, @Req() req: Request) {
    return this.createTestService.execute(dto, req);
  }

  @ApiOperation({
    summary: 'Get tests created by user',
    description: 'Get tests created by user',
  })
  @Roles('teacher')
  @Get('user')
  @ApiBearerAuth()
  @ApiCookieAuth()
  getUserTests(@Req() req: Request) {
    return this.getTestByUser.execute(req);
  }
}
