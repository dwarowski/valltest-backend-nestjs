import { ApiHideProperty } from '@nestjs/swagger';
import { TestsEntity } from 'src/tests/entity/test.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('session-test')
export class SessionTestEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @Column()
  user: number;

  @ManyToOne(() => TestsEntity, (test) => test.id)
  @Column()
  test: number;

  @Column()
  time_passed: Date;
}
