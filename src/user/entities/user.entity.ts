import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users') 
export class User {
  @PrimaryGeneratedColumn('uuid') // Уникальный идентификатор (UUID)
  id: string;

  @Column({ unique: true }) // Уникальный email
  email: string;

  @Column()
  password: string; // Пароль, будет храниться в зашифрованном виде (hash)[ё]

  @Column({ default: 'user' }) // По умолчанию у всех "user"
  role: string;

  @Column({ nullable: true }) // Можно оставить пустым
  name: string;

  @Column({ nullable: true })
  avatarUrl: string; // Фото профиля 

  @CreateDateColumn()
  createdAt: Date; // Дата создания пользователя

  @UpdateDateColumn()
  updatedAt: Date; // Дата последнего обновления

  @Column({ default: false }) 
  isDeleted: boolean; // Логическое удаление пользователя (если не хотим физически удалять)
}
