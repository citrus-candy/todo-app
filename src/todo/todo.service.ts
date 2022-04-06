import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entities/todo.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreateTodoDTO, UpdateTodoDTO } from './types/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async find(userId: string): Promise<Todo[]> {
    return await this.todoRepository.find({
      where: {
        user_id: userId,
      },
    });
  }

  async insert(userId: string, todo: CreateTodoDTO): Promise<InsertResult> {
    return await this.todoRepository.insert({ user_id: userId, ...todo });
  }

  async update(id: number, userId: string, todo: UpdateTodoDTO) {
    return await this.todoRepository.update(id, { user_id: userId, ...todo });
  }

  async remove(id: number, userId: string): Promise<Todo> {
    const deleteTodo = await this.todoRepository.findOne(id);
    if (deleteTodo.user_id === userId)
      return await this.todoRepository.remove(deleteTodo);
  }
}
