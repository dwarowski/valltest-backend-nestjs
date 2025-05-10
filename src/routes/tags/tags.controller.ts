import { Post, Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiOperation({
    summary: 'Create tag',
    description: 'Create tag',
  })
  createTag(@Body() dto: CreateTagDto) {
    return this.createTagService.execute(dto);
  }

  @Delete(':tag')
  @ApiOperation({
    summary: 'Delete tag',
    description: 'Delete tag',
  })
  deleteTag(@Param('tag') tag: string) {
    return this.deleteTagService.execute({ tag });
  }
}
