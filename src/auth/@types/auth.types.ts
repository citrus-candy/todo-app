import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export interface JWTPayload {
  id: User['id'];
  name: User['name'];
}

export class LoginResult {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user_id: string;
}

export class IdOmitUser extends OmitType(User, ['id'] as const) {}
export class PasswordOmitUser extends OmitType(User, ['password'] as const) {}
