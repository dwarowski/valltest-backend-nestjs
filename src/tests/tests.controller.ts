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
  Patch,
  Req,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { CreateTestDto } from './dto/create-test.dto';
import { TestFilterDto } from './dto/test-filter.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestsService } from './tests.service';
import { Roles } from 'src/decorators/roles-decorator';
import { Request } from 'express';

@Controller('tests')
@ApiTags('tests')
export class TestsController {
  constructor(private readonly TestsService: TestsService) {}

  @ApiQuery({ name: 'subject', required: false })
  @ApiQuery({ name: 'topic', required: false })
  @ApiQuery({ name: 'tag', required: false })
  @Get()
  getTests(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number = 1,
    @Query() filterDto?: TestFilterDto,
  ) {
    return this.TestsService.getTestsByPage(page, take, filterDto);
  }

  @Get('test/:id')
  getTestById(@Param('id') testId: string) {
    return this.TestsService.getTestById(+testId);
  }

  @Post()
  createTest(@Body() dto: CreateTestDto) {
    return this.TestsService.creatTest(dto);
  }

  @Delete('delete/:id')
  deleteTest(@Param('id') id: string) {
    return this.TestsService.deleteTest(+id);
  }

  @Post(':id/tag/:tag')
  addTagToTest(@Param('id') id: string, @Param('tag') tag: string) {
    return this.TestsService.addTagToTest(+id, tag);
  }

  @Delete(':id/tag/:tag')
  deleteTagByTestId(@Param('id') id: string, @Param('tag') tag: string) {
    return this.TestsService.deleteTagByTestId(+id, tag);
  }

  @Patch('update/:id')
  updateTest(@Param('id') id: string, @Body() dto: UpdateTestDto) {
    return this.TestsService.updateTest(+id, dto);
  }

  @Roles('teacher')
  @Get('userTests')
  getUserTests(@Req() req: Request) {
    return this.TestsService.getTestByUser(req);
  }
}
