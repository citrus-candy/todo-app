import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { PostSignupRequest } from './dto/signup.dto';
import { PostLoginRequest } from './dto/login.dto';
import { GetProfileResponse } from './dto/profile.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

type PasswordOmitUser = Omit<User, 'password'>;

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  /**
   * @description 新規登録
   * @param {PostSignupRequest} body bodyに付与されるユーザー情報
   * @returns {Promise<PostSignupResponse>} 新規登録に成功したユーザー情報
   */
  @Post('signup')
  @ApiTags('auth')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: String,
    description: 'Response message',
  })
  @ApiBody({ type: PostSignupRequest })
  async createUser(@Body() body: PostSignupRequest): Promise<string> {
    const user = await this.usersService.signup(body);

    return user;
  }

  /**
   * @description passport-local戦略によるログイン
   * @param {{ user: PasswordOmitUser }} req AuthGuardから返ってくるユーザー情報
   * @returns {Promise<{ access_token: string }>} ユーザーのjwtトークン
   */
  @UseGuards(AuthGuard('local')) // passport-local戦略を付与する
  @Post('login')
  @ApiTags('auth')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: String,
    description: 'Bearer token',
  })
  @ApiBody({ type: PostLoginRequest })
  async login(@Request() req: { user: PasswordOmitUser }): Promise<string> {
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
  @ApiTags('user')
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetProfileResponse,
    description:
      'If user information is returned, authentication has succeeded.',
  })
  getProfile(@Request() req: { user: PasswordOmitUser }): PasswordOmitUser {
    // JwtStrategy.validate()で認証して返した値がreq.userに入ってる
    const user = req.user;

    return user;
  }
}
