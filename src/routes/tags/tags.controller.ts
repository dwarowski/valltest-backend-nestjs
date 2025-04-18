import { Get, Post, Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTagDto } from '../../features/tags/dto/create-tag.dto';
import { TagsService } from 'src/features/tags/tags.service';

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
