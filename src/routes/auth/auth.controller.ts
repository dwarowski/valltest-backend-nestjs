import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

import { LoginDto } from '../../features/auth/login/login.dto';
import { RegisterDto } from '../../features/auth/register/register.dto';
import { LoginService } from 'src/features/auth/login/login.service';
import { RegisterService } from 'src/features/auth/register/register.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
  ) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.registerService.register(registerDto);
    return this.addTokenToCookie(access_token, res, 'register successful');
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.loginService.login(loginDto);
    return this.addTokenToCookie(access_token, res, 'login successful');
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logout successful' };
  }

  private addTokenToCookie(
    access_token: string,
    res: Response,
    message: string,
  ) {
    if (!access_token) {
      throw new UnauthorizedException();
    }

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: message };
  }
}
