import { GetTestDto } from 'src/shared/utils/dto/get-test/get-test.dto';

export class TestWithProblemsAndAnswers extends GetTestDto {
  problems: {
    id: number;
    question: string;
    answers: {
      id: number;
      value: string;
    }[];
  }[];
}
