import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Controller, 
    Body
} from '@nestjs/common';

import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';

@Controller('tests')
@ApiTags('tests')
export class TestsController {
    constructor(private readonly TestsService: TestsService) {}

    @Get()
    getTests(){
        return this.TestsService.getTests();
    }

    @Post()
    createTest(@Body() dto: CreateTestDto){
        return this.TestsService.creatTest(dto);
    }

}
