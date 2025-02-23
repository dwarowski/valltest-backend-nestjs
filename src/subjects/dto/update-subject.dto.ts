import { PartialType } from '@nestjs/swagger';
import { CreateSubjectDto } from './create-subject.dto';

export class UpdateSubjecDto extends PartialType(CreateSubjectDto) {}
