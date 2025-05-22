import { GetTestDto } from '../get-test/get-test.dto';

export class TestWithRatingDto extends GetTestDto {
  averageRating: number;
}
