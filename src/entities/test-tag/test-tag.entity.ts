import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TagsEntity } from 'src/entities/tags/tags.entity';
import { TestsEntity } from 'src/entities/tests/test.entity';

@Entity('test-tags')
export class TestTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestsEntity, (test) => test.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  test: TestsEntity;

  @ManyToOne(() => TagsEntity, (tags) => tags.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  tag: TagsEntity;
}
