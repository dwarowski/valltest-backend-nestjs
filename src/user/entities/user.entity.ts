import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RatingEntity } from '../../ratings/entity/rating.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashed_password: string;

  @Column({ nullable: true })
  avatar_location: string;

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];
}
