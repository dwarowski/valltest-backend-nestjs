import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { RolesUsersEntity } from 'src/entities/roles-users/roles-users.entity';

import { RatingEntity } from '../ratings/rating.entity';
import { Exclude } from 'class-transformer';
import { TestsEntity } from '../tests/test.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  hashed_password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ type: 'timestamp', nullable: true })
  refreshTokenExpirationDate: Date;
  
  @Column()
  isVerified: boolean;

  @Column()
  verificationToken: string;

  @Column({ nullable: true })
  avatar_location: string;

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];

  @OneToMany(() => RolesUsersEntity, (rolesUsers) => rolesUsers.user)
  role: RolesUsersEntity;

  @OneToMany(() => TestsEntity, (test) => test.userAuthor)
  test: TestsEntity;
}
