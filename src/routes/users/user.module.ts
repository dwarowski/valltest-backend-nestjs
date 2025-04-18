import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/users/user.entity';
import { UserController } from './user.controller';
import { ChangeUserPasswordService } from 'src/features/users/change-user-password/change-user-password.service';
import { GetUserService } from 'src/features/users/get-user/get-user.service';
import { GetUserByNameService } from 'src/features/users/get-user-by-name/get-user-by-name.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ChangeUserPasswordService, GetUserService, GetUserByNameService],
  controllers: [UserController],
  exports: [GetUserByNameService, GetUserService],
})
export class UserModule {}
