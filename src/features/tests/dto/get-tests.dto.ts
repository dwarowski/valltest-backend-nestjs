import { PartialType } from '@nestjs/swagger';
import { TestsEntity } from '../../../entities/tests/test.entity';

export class GetTestsDto extends PartialType(TestsEntity) {
  tags: string[];
  topicName: string;
  subjectName: string;
}
