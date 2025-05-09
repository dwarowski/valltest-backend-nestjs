import { ApiHideProperty } from '@nestjs/swagger';
import { ManyToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TestsEntity } from 'src/entities/tests/test.entity';
import { User } from 'src/entities/users/user.entity';

@Entity('favorite-test')
export class FavoriteTestEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => TestsEntity, (test) => test.id)
  test: TestsEntity;
}
