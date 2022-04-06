import { ApiProperty, OmitType } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}

export class PasswordOmitUser extends OmitType(User, ['password'] as const) {}
