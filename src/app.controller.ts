import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

type PasswordOmitUser = Omit<User, 'password'>;

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  /**
   * @description 新規登録
   * @param {User} body bodyに付与されるユーザー情報
   * @returns {Promise<User>} 新規登録に成功したユーザー情報
   */
  @Post('signup')
  createUser(@Body() body: User): Promise<User> {
    return this.usersService.signup(body);
  }

  /**
   * @description passport-local戦略によるログイン
   * @param {{ user: PasswordOmitUser }} req AuthGuardから返ってくるユーザー情報
   * @returns {Promise<{ access_token: string }>} ユーザーのjwtトークン
   */
  @UseGuards(AuthGuard('local')) // passport-local戦略を付与する
  @Post('login')
  async login(
    @Request() req: { user: PasswordOmitUser },
  ): Promise<{ access_token: string }> {
    // LocalStrategy.validate()で認証して返した値がreq.userに入ってる
    const user = req.user;

    return this.authService.login(user);
  }

  /**
   * @description JWT認証を用いたサンプルAPI
   * @param {{ user: PasswordOmitUser }} req AuthGuardから返ってくるユーザー情報
   * @returns {PasswordOmitUser} 認証に成功したユーザーの情報
   */
  @UseGuards(AuthGuard('jwt')) // passport-jwt戦略を付与する
  @Get('profile')
  getProfile(@Request() req: { user: PasswordOmitUser }): PasswordOmitUser {
    // JwtStrategy.validate()で認証して返した値がreq.userに入ってる
    const user = req.user;

    return user;
  }
}
