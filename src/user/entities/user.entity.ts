import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  USER = 'user', 
  TEACHER = 'teacher', 
  ADMIN = 'admin', 
}

@Entity('users') 
export class User {
  @PrimaryGeneratedColumn('uuid') // Уникальный идентификатор (UUID)
  id: string;

  @Column({ unique: true }) // Уникальный email
  email: string;

  @Column() // Пароль, будет храниться в зашифрованном виде (hash)
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER }) // Роль пользователя, по умолчанию 'user'
  role: UserRole;

  @Column({ nullable: true }) // Имя пользователя (может быть пустым)
  firstName: string;

  @Column({ nullable: true }) // Фамилия пользователя (может быть пустым)
  lastName: string;

  @Column({ default: 'https://example.com/default-avatar.png' }) // Ссылка на аватар, по умолчанию дефолтный аватар
  avatarUrl: string;

  @CreateDateColumn() // Дата создания пользователя, автоматически заполняется TypeORM
  createdAt: Date;

  @UpdateDateColumn() // Дата последнего обновления, автоматически обновляется TypeORM
  updatedAt: Date;

  @DeleteDateColumn() // Дата удаления (для мягкого удаления), автоматически заполняется TypeORM
  deletedAt: Date;

  @Column("text", { nullable: true })
  emailVerificationToken: string | null; // Токен для подтверждения email
}