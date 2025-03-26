import { TestTagEntity } from 'src/test-tag/entity/test-tag.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class TagsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @OneToMany(() => TestTagEntity, (testTag) => testTag.tag)
  tagTest: TagsEntity[];
}
