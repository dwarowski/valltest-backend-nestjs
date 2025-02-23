import { PartialType } from '@nestjs/swagger';
import { CreateSessionTestDto } from './create-session-test.dto';

export class UpdateSessionTestDto extends PartialType(CreateSessionTestDto) {}
