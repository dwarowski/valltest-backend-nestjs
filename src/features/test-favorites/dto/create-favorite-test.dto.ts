import { IsNotEmpty, IsObject } from 'class-validator';

import { TestsEntity } from 'src/entities/tests/test.entity';
import { User } from 'src/entities/users/user.entity';

export class CreateFavoriteTestDto {
  @IsNotEmpty()
  @IsObject()
  user: User;

  @IsNotEmpty()
  @IsObject()
  test: TestsEntity;
}
