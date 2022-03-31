import { ApiProperty, OmitType } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}

export class PasswordOmitUser extends OmitType(User, ['password'] as const) {}
