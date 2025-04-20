import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/users/user.entity';
import { UserController } from './user.controller';
import { ChangeUserPasswordService } from 'src/features/users/change-user-password/change-user-password.service';
import { GetUserService } from 'src/features/users/get-user/get-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ChangeUserPasswordService, GetUserService],
  controllers: [UserController],
  exports: [GetUserService],
})
export class UserModule {}
