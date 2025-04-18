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
import { Request } from 'express';

import { Roles } from 'src/decorators/roles-decorator';

import { CreateTestDto } from './dto/create-test.dto';
import { TestFilterDto } from './dto/test-filter.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestsService } from './tests.service';

@Controller('tests')
@ApiTags('Test')
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

  @Post('test')
  createTest(@Body() dto: CreateTestDto, @Req() req: Request) {
    return this.TestsService.creatTest(dto, req);
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
  updateTest(@Param('id') id: string, @Body() dto: UpdateTestDto, @Req() req: Request) {
    return this.TestsService.updateTest(+id, dto, req);
  }

  @Roles('teacher')
  @Get('user')
  getUserTests(@Req() req: Request) {
    return this.TestsService.getTestByUser(req);
  }
}
