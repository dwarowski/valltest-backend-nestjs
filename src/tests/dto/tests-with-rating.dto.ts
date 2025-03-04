import { TestsEntity } from "../entity/test.entity";

export class TestsWithRatingDto {
    tests: TestsEntity;
    rating: number = 0;
}