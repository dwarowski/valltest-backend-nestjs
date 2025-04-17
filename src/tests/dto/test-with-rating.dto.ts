import { TestsEntity } from "../entity/test.entity";

export class TestsWithRatingDto extends TestsEntity {
    averageRating: number;
}