import { PartialType } from '@nestjs/swagger';
import { CreateProblemDto } from './create-problem.dto';

export class UpdateSubjecDto extends PartialType(CreateProblemDto) {}
