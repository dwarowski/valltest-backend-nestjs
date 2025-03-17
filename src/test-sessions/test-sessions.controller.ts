import { ApiTags } from '@nestjs/swagger';

import { Controller, Get, Param } from '@nestjs/common';
import { TestSessionsService } from './test-sessions.service';

@ApiTags('test-sessions')
@Controller('test-sessions')
export class TestSessionsController {
  constructor(private readonly testSessionService: TestSessionsService) {}
  @Get(':id')
  getSessionTestById(@Param('id') id: string) {
    return this.testSessionService.getSessionTestById(+id);
  }
}
