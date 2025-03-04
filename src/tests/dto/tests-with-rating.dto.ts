import { TestsEntity } from "../entity/test.entity";

export class TestsWithRatingDto {
    tests: TestsEntity;
    averageRating: number = 0;
}