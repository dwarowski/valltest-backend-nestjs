import { TestsEntity } from "src/entities/tests/test.entity";

export class TestsWithRatingDto extends TestsEntity {
  averageRating: number;
}
