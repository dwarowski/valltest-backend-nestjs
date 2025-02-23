import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Body,
    Controller 
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
    constructor(private readonly SubjectsService: SubjectsService) {}

    @Get()
    getSubject(){
        return this.SubjectsService.getSubject();
    }

    @Post()
    createSubject(@Body() dto: CreateSubjectDto){
        return this.SubjectsService.createSubject(dto);
    }

}