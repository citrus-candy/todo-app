import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity'; // typeormで定義したUserエンティティ

/**
 * @description User情報を扱うクラス
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @description パスワードをハッシュ化する
   */
  private getPasswordHash(_password: string) {
    const saltRounds = 10;
    const salt: string = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(_password, salt);
  }

  /**
   * @description 新規登録
   */
  async signup(user: User): Promise<User | undefined> {
    const dbUser = await this.findOne(user.name); // DBからUserを取得
    if (!dbUser) {
      return new Promise((resolve, reject) => {
        // パスワードをハッシュ化する
        user.password = this.getPasswordHash(user.password);
        // ユーザ情報を設定する
        this.userRepository
          .save<User>(user)
          .then((result: User) => {
            resolve(result);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    } else {
      return undefined;
    }
  }

  /**
   * @description ユーザーを一人を返す
   */
  findOne(name: User['name']): Promise<User | undefined> {
    // typeormからDBにアクセスして、ユーザーを取得する
    return this.userRepository.findOne({ where: { name } });
  }
}
