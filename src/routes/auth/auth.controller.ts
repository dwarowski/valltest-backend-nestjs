import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { LoginDto } from '../../features/auth/login/login.dto';
import { RegisterDto } from '../../features/auth/register/register.dto';
import { LoginService } from 'src/features/auth/login/login.service';
import { RegisterService } from 'src/features/auth/register/register.service';
import { addTokenToCookie } from 'src/shared/utils/functions/add-toke-to-cookie/add-token-to-cookie';
import { RefreshTokenService } from 'src/features/auth/refresh/refresh-jwt.serivce';
import { LogoutService } from 'src/features/auth/logout/logout.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly refreshService: RefreshTokenService,
    private readonly logoutService: LogoutService,
  ) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token} = await this.registerService.register(registerDto);
    return addTokenToCookie(access_token, refresh_token, res, 'register successful');
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } = await this.loginService.login(loginDto);
    return addTokenToCookie(access_token, refresh_token, res, 'login successful');
  }

  @Post('refresh')
  async resfreshToken(@Req() req: Request,  @Res({ passthrough: true }) res: Response) {
    const { access_token, refresh_token } =  await this.refreshService.execute(req)
    return addTokenToCookie( access_token, refresh_token, res, 'refresh succsesful')
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.logoutService.execute(req);

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'Logout successful' };
  }
}
