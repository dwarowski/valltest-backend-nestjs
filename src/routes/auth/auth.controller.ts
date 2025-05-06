import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { LoginDto } from '../../features/auth/login/login.dto';
import { RegisterDto } from '../../features/auth/register/register.dto';
import { LoginService } from 'src/features/auth/login/login.service';
import { RegisterService } from 'src/features/auth/register/register.service';
import { addTokenToCookie } from 'src/shared/utils/functions/add-toke-to-cookie/add-token-to-cookie';
import { RefreshTokenService } from 'src/features/auth/refresh/refresh-jwt.serivce';
import { LogoutService } from 'src/features/auth/logout/logout.service';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { VerifyEmailService } from 'src/features/auth/verify-email/verify-email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly refreshService: RefreshTokenService,
    private readonly logoutService: LogoutService,
    private readonly verifyEmailService: VerifyEmailService,
  ) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      await this.registerService.register(registerDto);
    addTokenToCookie(access_token, refresh_token, res);
    return { access_token, refresh_token };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      await this.loginService.login(loginDto);
    addTokenToCookie(access_token, refresh_token, res);
    return { access_token, refresh_token };
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Post('refresh')
  async resfreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      await this.refreshService.execute(req);
    addTokenToCookie(access_token, refresh_token, res);
    return { access_token, refresh_token };
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return await this.verifyEmailService.execute(token);
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.logoutService.execute(req, res);
  }
}
