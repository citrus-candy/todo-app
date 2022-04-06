import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Any, ObjectLiteral, UpdateResult } from 'typeorm';

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

export class UpdateTodoDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  status: boolean;
}

export class UpdateResultDTO extends UpdateResult {
  @ApiProperty({ type: Any })
  raw: any;

  @ApiProperty({ type: Number })
  affected?: number;

  @ApiProperty({ type: Array })
  generatedMaps: ObjectLiteral[];
}
