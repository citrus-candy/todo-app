import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';

type PasswordOmitUser = Omit<User, 'password'>;

interface JWTPayload {
  id: User['id'];
  name: User['name'];
}

/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  /**
   * @description ユーザー認証をする
   * @param {string} name ユーザー名
   * @param {string} password パスワード
   * @returns {Promise<PasswordOmitUser | null>} ユーザー情報 or null
   */
  async validateUser(
    name: User['name'],
    password: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const dbUser = await this.usersService.findOne(name); // DBからUserを取得

    // DBに保存されているpasswordはハッシュ化されている事を想定しているので、
    // bcryptなどを使ってパスワードを判定する
    if (dbUser && bcrypt.compareSync(password, dbUser.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = dbUser; // パスワード情報を外部に出さないようにする

      return result;
    }

    return null;
  }

  /**
   * @description ログイン
   * @param {PasswordOmitUser} user パスワードを除いたユーザー情報
   * @returns {Promise<{ access_token: string }>} jwt token
   */
  async login(user: PasswordOmitUser): Promise<string> {
    // jwtにつけるPayload情報
    const payload: JWTPayload = { id: user.id, name: user.name };

    return this.jwtService.sign(payload);
  }
}
