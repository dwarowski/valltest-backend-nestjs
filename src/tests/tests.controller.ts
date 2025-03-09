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
    Delete,
    Patch
} from '@nestjs/common';

import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Controller('tests')
@ApiTags('tests')
export class TestsController {
    constructor(private readonly TestsService: TestsService) {}

    @Get()
    getTests(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1, @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number = 1) {
        return this.TestsService.getTestsByPage(page, take);
    }

    @Get(':id')
    getTestById(@Param('id') testId: string){
        return this.TestsService.getTestById(+testId);
    }

    @Post()
    createTest(@Body() dto: CreateTestDto){
        return this.TestsService.creatTest(dto);
    }

    @Delete('delete/:id')
    deleteTest(@Param('id') id: string){
        return this.TestsService.deleteTest(+id);
    }

    @Patch('update/:id')
    updateTest(@Param('id') id: string, @Body() dto: UpdateTestDto){
        return this.TestsService.updateTest(+id, dto);
    }

}
