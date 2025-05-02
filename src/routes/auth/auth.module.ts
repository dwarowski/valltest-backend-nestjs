import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/users/user.entity';
import { UserModule } from '../users/user.module';

import { AuthController } from './auth.controller';
import { RegisterService } from 'src/features/auth/register/register.service';
import { LoginService } from 'src/features/auth/login/login.service';
import { RolesUsersModule } from '../roles-users/roles-users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    RolesUsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RegisterService, LoginService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
