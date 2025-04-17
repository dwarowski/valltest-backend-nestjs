import { TagsEntity } from "src/tags/entity/tags.entity";

export class UserTests {
    id: number;
    testName: string;
    difficulty: number;
    createdAt: Date;
    averageRating: number;
    testTag: TagsEntity[];
}