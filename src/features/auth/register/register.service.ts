import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';

import { User } from 'src/entities/users/user.entity';

import { LoginDto } from '../login/login.dto';
import { RegisterDto } from './register.dto';
import { LoginService } from '../login/login.service';
import { AddRoleToUsersService } from 'src/features/roles-users/add-role-to-user/add-roles-to-user.service';
import { EmailService } from 'src/shared/utils/mailer/mailer.service';
import { ReturnTokensDto } from 'src/shared/utils/dto/return-tokens/return-tokens.dto';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(LoginService)
    private readonly loginService: LoginService,
    @Inject(AddRoleToUsersService)
    private readonly addRoleToUser: AddRoleToUsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(EmailService)
    private readonly _emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<ReturnTokensDto> {
    // Проверяем, что пользователь с таким email еще не существует
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new ConflictException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }

    const verificationToken = uuidv4();
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    // Сохраняем пользователя в базе данных
    const userEntity = await this.userRepository.save({
      username: this.generateRandomString(10),
      email: registerDto.email,
      hashed_password: hashedPassword,
      isVerified: false,
      verificationToken,
    });

    // await this.emailService.sendVerificationEmail(
    //   registerDto.email,
    //   verificationToken,
    // );

    const _roleAssign = await this.addRoleToUser.execute({
      user: userEntity.id,
      role: 'teacher',
    }); // TODO wait for design update

    const loginDto: LoginDto = {
      email: registerDto.email,
      password: registerDto.password,
    };

    return await this.loginService.login(loginDto);
  }

  //TODO: Убрать когда появится поле для имени в дизайне
  private generateRandomString(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
