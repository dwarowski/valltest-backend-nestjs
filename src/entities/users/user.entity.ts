import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { RolesUsersEntity } from 'src/entities/roles-users/roles-users.entity';

import { RatingEntity } from '../ratings/rating.entity';
import { Exclude } from 'class-transformer';
import { TestsEntity } from '../tests/test.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  hashed_password: string;

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string | null;

  @Column({ type: 'timestamp', nullable: true })
  refreshTokenExpirationDate: Date | null;

  @Column()
  isVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  verificationToken: string | null;

  @Column({ type: 'varchar', nullable: true })
  avatar_location: string | null;

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];

  @OneToMany(() => RolesUsersEntity, (rolesUsers) => rolesUsers.user)
  role: RolesUsersEntity;

  @OneToMany(() => TestsEntity, (test) => test.userAuthor)
  test: TestsEntity;
}
