import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import {
  IdOmitUser,
  JWTPayload,
  LoginResult,
  PasswordOmitUser,
} from './@types/auth.types';

/**
 * @description 認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @description 新規登録
   * @param {IdOmitUser} idOmitUser ユーザー情報
   * @returns {Promise<string>} メッセージ
   */
  async signup(idOmitUser: IdOmitUser): Promise<PasswordOmitUser | string> {
    const { name, password } = idOmitUser;
    const dbUser = await this.findOne(name); // DBからUserを取得
    if (!dbUser) {
      // UUIDでユーザーIDを生成
      const uuid: string = uuidV4();

      // パスワードをハッシュ化
      const hashPassword: string = this.getPasswordHash(password);

      // ユーザ情報を設定する
      const user: User = { id: uuid, name, password: hashPassword };
      const response = await this.userRepository.save(user);

      return { id: response.id, name: response.name };
    } else {
      return 'The name is already in use.';
    }
  }

  /**
   * @description ログイン
   * @param {PasswordOmitUser} user パスワードを除いたユーザー情報
   * @returns {Promise<{ access_token: string }>} jwt token
   */
  async login(user: PasswordOmitUser): Promise<LoginResult> {
    // jwtにつけるPayload情報
    const payload: JWTPayload = { id: user.id, name: user.name };
    const token: string = this.jwtService.sign(payload);

    return { token, user_id: user.id };
  }

  /**
   * @description パスワードをハッシュ化する
   * @param {string} _password パスワード
   * @returns {string} ハッシュ化したパスワード
   */
  private getPasswordHash(_password: string): string {
    const saltRounds = 10;
    const salt: string = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(_password, salt);
  }

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
    const dbUser = await this.findOne(name); // DBからUserを取得

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
   * @description ユーザーを一人を返す
   * @param {string} name ユーザー名
   * @returns {Promise<User | undefined>} ユーザー情報 or undefined
   */
  findOne(name: User['name']): Promise<User | undefined> {
    // typeormからDBにアクセスして、ユーザーを取得する
    return this.userRepository.findOne({ where: { name } });
  }
}
