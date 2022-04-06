import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDTO, UpdateTodoDTO } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findByUserId(userId: string): Promise<Todo[]> {
    return await this.todoRepository.find({
      where: {
        user_id: userId,
      },
    });
  }

  async create(Todo: CreateTodoDTO): Promise<CreateTodoDTO & Todo> {
    return await this.todoRepository.save(Todo);
  }

  async update(id: number, userId: string, todo: UpdateTodoDTO) {
    return await this.todoRepository.update(id, { user_id: userId, ...todo });
  }
}
