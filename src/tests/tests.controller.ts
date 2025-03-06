import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Controller, 
    Body,
    Query,
    DefaultValuePipe,
    ParseIntPipe,
    Param,
    Delete
} from '@nestjs/common';

import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';

@Controller('tests')
@ApiTags('tests')
export class TestsController {
    constructor(private readonly TestsService: TestsService) {}

    @Get()
    getTests(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1, @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number = 1) {
        return this.TestsService.getTestsPage(page, take);
    }

    @Get(':testId')
    getTestById(@Param('testId') testId: string){
        return this.TestsService.getTestById(+testId);
    }

    @Post()
    createTest(@Body() dto: CreateTestDto){
        return this.TestsService.creatTest(dto);
    }

    @Delete(':id')
    deleteTest(@Param('id') id: string){
        return this.TestsService.deleteTest(+id);
    }

}
