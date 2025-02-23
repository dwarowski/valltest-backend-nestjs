import { PartialType } from '@nestjs/swagger';
import { CreateSessionTestDto } from './create-session-test.dto';

export class UpdateSubjecDto extends PartialType(CreateSessionTestDto) {}
