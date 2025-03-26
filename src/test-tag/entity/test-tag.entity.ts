import { TagsEntity } from 'src/tags/entity/tags.entity';
import { TestsEntity } from 'src/tests/entity/test.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
