import { ApiProperty } from '@nestjs/swagger';
import { InsertResult, ObjectLiteral, UpdateResult } from 'typeorm';

export class ApiInsertResult extends InsertResult {
  @ApiProperty()
  identifiers: ObjectLiteral[];

  @ApiProperty()
  generatedMaps: ObjectLiteral[];

  @ApiProperty()
  raw: any;
}

export class ApiUpdateResult extends UpdateResult {
  @ApiProperty()
  raw: any;

  @ApiProperty()
  affected?: number;

  @ApiProperty()
  generatedMaps: ObjectLiteral[];
}
