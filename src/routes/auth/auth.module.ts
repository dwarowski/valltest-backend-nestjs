import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/users/user.entity';
import { UserModule } from '../users/user.module';

import { AuthController } from './auth.controller';
import { RegisterService } from 'src/features/auth/register/register.service';
import { LoginService } from 'src/features/auth/login/login.service';
import { RolesUsersModule } from '../roles-users/roles-users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    RolesUsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [RegisterService, LoginService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
