import {
  Get,
  Post,
  Controller,
  Body,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { Roles } from 'src/shared/utils/decorators/roles-decorator';

import { CreateTestDto } from '../../features/tests/create-test/create-test.dto';
import { TestFilterDto } from '../../features/tests/get-tests-page/test-filter.dto';
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

  @ApiQuery({ name: 'subject', required: false })
  @ApiQuery({ name: 'topic', required: false })
  @ApiQuery({ name: 'tag', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'take', required: false })
  @Get()
  getTests(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('take', new DefaultValuePipe(1), ParseIntPipe) take: number = 1,
    @Query() filterDto?: TestFilterDto,
  ) {
    return this.getTestsByPageService.execute(page, take, filterDto);
  }

  @Get('test/:id')
  getTestById(@Param('id') testId: string) {
    return this.getTestByIdService.execute(+testId, 'test');
  }

  @Post('test')
  createTest(@Body() dto: CreateTestDto, @Req() req: Request) {
    return this.createTestService.execute(dto, req);
  }

  @Delete('delete/:id')
  deleteTest(@Param('id') id: string) {
    return this.deleteTestService.execute(+id);
  }

  @Roles('teacher')
  @Get('user')
  getUserTests(@Req() req: Request) {
    return this.getTestByUser.getTestByUser(req);
  }
}
