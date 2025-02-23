import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';

export class UpdateSubjecDto extends PartialType(CreateTagDto) {}
