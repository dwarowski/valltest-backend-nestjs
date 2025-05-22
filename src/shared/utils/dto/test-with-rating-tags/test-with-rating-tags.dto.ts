import { GetTestDto } from '../get-test/get-test.dto';

export class TestWithRatingAndTagsDto extends GetTestDto {
  tags: string[];
  averageRating: number;
}
