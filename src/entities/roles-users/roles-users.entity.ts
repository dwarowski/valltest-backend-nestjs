import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEntity } from 'src/entities/roles/role.entity';
import { User } from 'src/entities/users/user.entity';

@Entity('role-user')
export class RolesUsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoleEntity, (role) => role.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  role: RoleEntity;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
