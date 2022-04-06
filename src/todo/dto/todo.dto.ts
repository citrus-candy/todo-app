import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  title: string;
}
