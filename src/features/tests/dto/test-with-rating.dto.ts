import { TestsEntity } from '../../../entities/tests/test.entity';

export class TestsWithRatingDto extends TestsEntity {
  averageRating: number;
}
