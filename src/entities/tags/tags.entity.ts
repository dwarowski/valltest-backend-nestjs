import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TestTagEntity } from 'src/entities/test-tag/test-tag.entity';

@Entity('tags')
export class TagsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @OneToMany(() => TestTagEntity, (testTag) => testTag.tag)
  tagTest: TestTagEntity[];
}
