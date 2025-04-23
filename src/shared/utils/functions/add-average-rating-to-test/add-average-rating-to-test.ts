import { TestsEntity } from "src/entities/tests/test.entity";
import { TestsWithRatingDto } from "./test-with-rating.dto";

export function addAverageRatingToTests(
    tests: TestsEntity[],
  ) {
    return Promise.all(
      tests.map(async (test) => {
        const averageRating = await this.getTestAverageRating.execute(test.id);
        return { ...test, averageRating: averageRating };
      }),
    );
  }