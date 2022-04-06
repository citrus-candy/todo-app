import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @ApiProperty()
  @PrimaryColumn()
  todo_id: string;

  @ApiProperty()
  @Column({ nullable: false })
  user_id: string;

  @ApiProperty()
  @Column({ nullable: false })
  title: string;

  @ApiProperty()
  @Column({ default: false })
  status: boolean;

  @ApiProperty()
  @CreateDateColumn()
  readonly created_at?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  readonly updated_at?: Date;
}
