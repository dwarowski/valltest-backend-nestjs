import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { LoginDto } from '../../features/auth/login/login.dto';
import { RegisterDto } from '../../features/auth/register/register.dto';
import { LoginService } from 'src/features/auth/login/login.service';
import { RegisterService } from 'src/features/auth/register/register.service';
import { addTokenToCookie } from 'src/shared/utils/functions/add-toke-to-cookie/add-token-to-cookie';
import { RefreshTokenService } from 'src/features/auth/refresh/refresh-jwt.serivce';
import { LogoutService } from 'src/features/auth/logout/logout.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyEmailService } from 'src/features/auth/verify-email/verify-email.service';
import { ReturnTokensDto } from 'src/shared/utils/dto/return-tokens/return-tokens.dto';

@ApiTags('Authorization')
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
  @ApiOperation({
    summary: 'Authorization in system',
    description: 'Give access and refresh token for user that registred',
  })
  @ApiBody({ type: RegisterDto })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ReturnTokensDto> {
    const tokensDto = await this.registerService.register(registerDto);
    addTokenToCookie(tokensDto, res);
    return tokensDto;
  }

  @Get('login')
  @ApiOperation({
    summary: 'Authorization in system',
    description: 'Give access and refresh token for user that registred',
  })
  @ApiBody({ type: LoginDto })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ReturnTokensDto> {
    const tokensDto = await this.loginService.login(loginDto);
    addTokenToCookie(tokensDto, res);
    return tokensDto;
  }

  @Get('refresh')
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Refresh access token if expired',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  async resfreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ReturnTokensDto> {
    const tokensDto = await this.refreshService.execute(req);
    addTokenToCookie(tokensDto, res);
    return tokensDto;
  }

  @Get('verify-email')
  @ApiOperation({
    summary: 'Email verification',
    description: 'User email verification via generated token',
  })
  async verifyEmail(@Query('token') token: string): Promise<boolean> {
    return await this.verifyEmailService.execute(token);
  }

  @Get('logout')
  @ApiOperation({
    summary: 'Logout',
    description: 'Logout',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    return await this.logoutService.execute(req, res);
  }
}
