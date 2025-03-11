import { ApiHideProperty } from '@nestjs/swagger';
import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TestsEntity } from 'src/tests/entity/test.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('rating')
export class RatingEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ratings) // Связь с пользователем
  user: User;

  @ManyToOne(() => TestsEntity, (test) => test.ratings) // Связь с тестом
  test: TestsEntity;

  @Column({ type: 'int' })
  rating: number; // Оценка от 1 до 5

  @Column({ type: 'text', nullable: true }) // Комментарий необязательный
  comment: string | null;
}