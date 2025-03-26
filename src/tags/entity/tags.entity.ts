import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TestTagEntity } from 'src/test-tag/entity/test-tag.entity';

@Entity('tags')
export class TagsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @OneToMany(() => TestTagEntity, (testTag) => testTag.tag)
  tagTest: TagsEntity[];
}
