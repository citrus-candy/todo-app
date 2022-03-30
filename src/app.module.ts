import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), // typeormを使うために使用
    ConfigModule.forRoot({
      // envファイルを組み込むために使用
      isGlobal: true,
    }),
    UsersModule,
    AuthModule, // 必須！これが無いと認証処理が動かない
  ],
  controllers: [
    AppController, // 後述するクラス
  ],
  providers: [AppService],
})
export class AppModule {}
