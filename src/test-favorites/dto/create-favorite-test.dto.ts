import { IsNotEmpty, IsObject } from 'class-validator';
import { TestsEntity } from 'src/tests/entity/test.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateFavoriteTestDto {
  @IsNotEmpty()
  @IsObject()
  user: User;

  @IsNotEmpty()
  @IsObject()
  test: TestsEntity;
}
