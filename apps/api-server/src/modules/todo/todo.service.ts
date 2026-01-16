import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from "./todo.repository";
import { CreateTodoRequest, UpdateTodoRequest } from "./todo.request";
import { TodoSchema } from "./todo.schema";
import { PageRequest } from "../../core/request/requests";
import { PageResult } from "../../core/response/base.response";

@Injectable()
export class TodoService {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) {
    }

    async create(request: CreateTodoRequest): Promise<TodoSchema> {
        const todoEntity = await this.todoRepository.create({
            title: request.title,
            completed: request.completed,
            description: request.description
        });
        return new TodoSchema(todoEntity).toDetail();
    }


    async findById(id: string): Promise<TodoSchema> {
        const todo = await this.todoRepository.findById(id);
        if (!todo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return new TodoSchema(todo).toDetail();
    }


    async update(id: string, updateDto: UpdateTodoRequest): Promise<TodoSchema> {
        const todo = await this.todoRepository.update(id, updateDto);
        if (!todo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return new TodoSchema(todo).toDetail();
    }


    async delete(id: string): Promise<TodoSchema> {
        const todo = await this.todoRepository.delete(id);
        if (!todo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return new TodoSchema(todo).toDetail();
    }


    async findPage(page: PageRequest, search?: string): Promise<PageResult<TodoSchema>> {
        const filter: any = {};
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }
        const result = await this.todoRepository.findByPage(filter, page.page_index, page.page_size);
        const todoSchemas = result.items.map(value => new TodoSchema(value).toReference());

        return new PageResult<TodoSchema>(todoSchemas, result.total, result.page_index, result.page_size);
    }


    async markCompleted(id: string): Promise<TodoSchema> {
        return this.update(id, { completed: true });
    }

}
