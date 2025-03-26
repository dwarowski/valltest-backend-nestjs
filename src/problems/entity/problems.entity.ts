import { ApiHideProperty } from '@nestjs/swagger';
import { TestsEntity } from 'src/tests/entity/test.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('problems')
export class ProblemsEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestsEntity, (test) => test.id, { onDelete: 'CASCADE' })
  test: number;

  @Column()
  question: string;
}
