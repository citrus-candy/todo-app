import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { InsertResult, UpdateResult } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDTO, UpdateTodoDTO } from './@types/todo.dto';
import { TodoService } from './todo.service';
import { ApiInsertResult, ApiUpdateResult } from './@types/todo.types';

@Controller('todo')
@UseGuards(AuthGuard('jwt'))
@ApiTags('todo')
@ApiBearerAuth()
export class TodoController {
  constructor(private readonly service: TodoService) {}

  /**
   * @description 指定したユーザーIDのtodoを全件取得
   * @param {string} userId ユーザーID
   * @returns {Promise<Todo[]>} todo
   */
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Todo],
    description: 'Todo contents',
  })
  @Get()
  async getTodo(@Query('user_id') userId: string): Promise<Todo[]> {
    return await this.service.find(userId);
  }

  /**
   * @description todoを追加
   * @param {CreateTodoDTO} todo ユーザーIDとtodo
   * @returns {Promise<Todo[]>} 追加したtodo
   */
  @ApiBody({ type: CreateTodoDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ApiInsertResult,
  })
  @Post()
  async addTodo(
    @Query('user_id') userId: string,
    @Body() todo: CreateTodoDTO,
  ): Promise<InsertResult> {
    return await this.service.insert(userId, todo);
  }

  /**
   * @description todoを更新
   * @param {number} id todoのID
   * @param {string} userId ユーザーID
   * @param {UpdateTodoDTO} todo 更新情報
   * @returns {UpdateResult} 処理結果
   */
  @ApiBody({ type: UpdateTodoDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ApiUpdateResult,
  })
  @Put(':id/update')
  async updateTodo(
    @Param('id') id: number,
    @Query('user_id') userId: string,
    @Body() todo: UpdateTodoDTO,
  ): Promise<UpdateResult> {
    return await this.service.update(id, userId, todo);
  }

  /**
   * @description todoを削除
   * @param {number} id todoのID
   * @param {string} userId ユーザーID
   * @returns {Promise<Todo>} 削除したtodo
   */
  @ApiResponse({
    status: HttpStatus.OK,
    type: OmitType(Todo, ['todo_id'] as const),
  })
  @Delete(':id')
  async deleteTodo(
    @Param('id') id: number,
    @Query('user_id') userId: string,
  ): Promise<Todo> {
    return await this.service.remove(id, userId);
  }
}
