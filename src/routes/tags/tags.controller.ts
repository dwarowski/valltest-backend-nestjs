import { Post, Body, Controller, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateTagDto } from '../../features/tags/create-tag/create-tag.dto';
import { CreateTagService } from 'src/features/tags/create-tag/create-tag.service';
import { DeleteTagService } from 'src/features/tags/delete-tag/delete-tag.service';
import { DeleteTagDto } from 'src/features/tags/delete-tag/delete-tag.dto';

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

  @Delete()
  @ApiOperation({
    summary: 'Delete tag',
    description: 'Delete tag',
  })
  deleteTag(@Body() tagDto: DeleteTagDto) {
    return this.deleteTagService.execute(tagDto);
  }
}
