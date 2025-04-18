import { Get, Post, Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTagDto } from '../../features/tags/create-tag/create-tag.dto';
import { CreateTagService } from 'src/features/tags/create-tag/create-tag.service';
import { DeleteTagService } from 'src/features/tags/delete-tag/delete-tag.service';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(
    private readonly createTagService: CreateTagService,
    private readonly deleteTagService: DeleteTagService,
  ) {}

  @Post()
  createTag(@Body() dto: CreateTagDto) {
    return this.createTagService.createTag(dto);
  }

  @Delete(':id')
  deleteTag(@Param('id') tag: string) {
    return this.deleteTagService.deleteTagByName(tag);
  }
}
