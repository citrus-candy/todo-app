import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
}

export class UpdateTodoDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
