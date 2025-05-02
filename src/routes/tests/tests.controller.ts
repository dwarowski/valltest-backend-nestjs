import {
  Get,
  Post,
  Controller,
  Body,
  Query,
  ParseIntPipe,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { Roles } from 'src/shared/utils/decorators/roles-decorator';

import { CreateTestDto } from '../../features/tests/create-test/create-test.dto';
import { PageTestDto } from '../../features/tests/get-tests-page/page-test.dto';
import { GetTestsPageService } from 'src/features/tests/get-tests-page/get-tests-page.service';
import { GetTestsIdService } from 'src/features/tests/get-test-id/get-tests-id.service';
import { CreateTestsService } from 'src/features/tests/create-test/create-tests.service';
import { DeleteTestsService } from 'src/features/tests/delete-test/delete-tests.service';
import { GetUsersTestsService } from 'src/features/tests/get-test-user/get-user-tests.service';

@Controller('tests')
@ApiTags('Test')
export class TestsController {
  constructor(
    private readonly getTestsByPageService: GetTestsPageService,
    private readonly getTestByIdService: GetTestsIdService,
    private readonly createTestService: CreateTestsService,
    private readonly deleteTestService: DeleteTestsService,
    private readonly getTestByUser: GetUsersTestsService,
  ) {}

  @Get()
  getTests(@Query() dto: PageTestDto) {
    return this.getTestsByPageService.execute(dto);
  }

  @Get('test/:id')
  getTestById(@Param('id', ParseIntPipe) testId: number) {
    return this.getTestByIdService.execute(testId, 'test');
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Post('test')
  createTest(@Body() dto: CreateTestDto, @Req() req: Request) {
    return this.createTestService.execute(dto, req);
  }

  @Delete('delete/:id')
  deleteTest(@Param('id', ParseIntPipe) id: number) {
    return this.deleteTestService.execute(id);
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Roles('teacher')
  @Get('user')
  getUserTests(@Req() req: Request) {
    return this.getTestByUser.execute(req);
  }
}
