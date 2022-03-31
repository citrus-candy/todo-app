import { PasswordOmitUser } from '../model/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class GetProfileResponse {
  @ApiProperty({ type: PasswordOmitUser })
  user: PasswordOmitUser;
}
