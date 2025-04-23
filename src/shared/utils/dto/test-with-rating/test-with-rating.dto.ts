import { PartialType } from "@nestjs/mapped-types";
import { TestsEntity } from "src/entities/tests/test.entity";

export class TestWithRatingDto extends PartialType(TestsEntity) {
    averageRating: number;
}