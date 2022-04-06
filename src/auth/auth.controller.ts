import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthDTO } from './@types/auth.dto';
import { LoginResult, PasswordOmitUser } from './@types/auth.types';

import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   * @description 新規登録
   * @param {AuthDTO} body bodyに付与されるユーザー情報
   * @returns {Promise<PasswordOmitUser | string>} 新規登録に成功したユーザー情報 or エラーメッセージ
   */
  @Post('signup')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PasswordOmitUser,
  })
  @ApiBody({ type: AuthDTO })
  async createUser(@Body() body: AuthDTO): Promise<PasswordOmitUser | string> {
    return await this.service.signup(body);
  }

  /**
   * @description passport-local戦略によるログイン
   * @param {{ user: PasswordOmitUser }} req AuthGuardから返ってくるユーザー情報
   * @returns {Promise<LoginResult>} ユーザーのIDとjwtトークン
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LoginResult,
  })
  @ApiBody({ type: AuthDTO })
  async login(
    @Request() req: { user: PasswordOmitUser },
  ): Promise<LoginResult> {
    return await this.service.login(req.user);
  }
}
