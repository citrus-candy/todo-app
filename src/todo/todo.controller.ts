import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDTO } from './dto/todo.dto';
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
}
