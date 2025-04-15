import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEntity } from 'src/roles/entity/role.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('role-user')
export class RolesUsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoleEntity, (role) => role.id, { onDelete: 'CASCADE' })
  role: RoleEntity;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;
}
