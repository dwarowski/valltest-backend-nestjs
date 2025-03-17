import { ApiTags } from '@nestjs/swagger';

import { Get, Post, Body, Controller, Delete, Param } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
@ApiTags('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getTags() {
    return this.tagsService.getTags();
  }

  @Post()
  createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }

  @Delete(':id')
  deleteTag(@Param('id') id: string) {
    return this.tagsService.deleteTagById(+id);
  }
}
