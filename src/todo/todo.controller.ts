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
import { UpdateResult } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDTO, UpdateResultDTO, UpdateTodoDTO } from './dto/todo.dto';
import { TodoService } from './todo.service';

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
  @Get(':userId')
  async getTodo(@Param('userId') userId: string): Promise<Todo[]> {
    return await this.service.findByUserId(userId);
  }

  /**
   * @description todoを追加
   * @param {CreateTodoDTO} todo ユーザーIDとtodo
   * @returns {Promise<Todo[]>} 追加したtodo
   */
  @ApiBody({ type: CreateTodoDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Todo,
  })
  @Post()
  async addTodo(@Body() todo: CreateTodoDTO): Promise<CreateTodoDTO & Todo> {
    return await this.service.create(todo);
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
    type: UpdateResultDTO,
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
    return await this.service.delete(id, userId);
  }
}
