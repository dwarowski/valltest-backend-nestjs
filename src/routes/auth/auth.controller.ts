import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { LoginDto } from '../../features/auth/login/login.dto';
import { RegisterDto } from '../../features/auth/register/register.dto';
import { LoginService } from 'src/features/auth/login/login.service';
import { RegisterService } from 'src/features/auth/register/register.service';
import { addTokenToCookie } from 'src/shared/utils/functions/add-toke-to-cookie/add-token-to-cookie';

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
    return addTokenToCookie(access_token, res, 'register successful');
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.loginService.login(loginDto);
    return addTokenToCookie(access_token, res, 'login successful');
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'Logout successful' };
  }
}
