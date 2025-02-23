import { ApiTags } from '@nestjs/swagger';

import {
    Get,
    Post,
    Body,
    Controller 
} from '@nestjs/common';

import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller('topics')
@ApiTags('topics')
export class TopicsController {
    constructor(private readonly TopicsService: TopicsService) {}

    @Get()
    getTopic(){
        return this.TopicsService.getTopic();
    }

    @Post()
    createTopic(@Body() dto: CreateTopicDto){
        return this.TopicsService.createTopic(dto);
    }

}

