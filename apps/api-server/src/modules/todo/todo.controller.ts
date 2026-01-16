import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTodoRequest, UpdateTodoRequest } from "./todo.request";
import { TodoService } from "./todo.service";
import { TodoSchema } from "./todo.schema";
import { PageResult } from "../../core/response/base.response";


@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {
    }

    @Post()
    async create(@Body() request: CreateTodoRequest): Promise<TodoSchema> {
        return this.todoService.create(request);
    }


    @Get(':id')
    async findById(@Param('id') id: string): Promise<TodoSchema> {
        return this.todoService.findById(id);
    }


    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateTodoRequest): Promise<TodoSchema> {
        return this.todoService.update(id, updateDto);
    }


    @Delete(':id')
    async delete(@Param('id') id: string): Promise<TodoSchema> {
        return this.todoService.delete(id);
    }

    /**
     * 分页查询 Todo
     * ?page_index=1&page_size=30&search=xxx
     */
    @Get()
    async findPage(
        @Query('page_index') page_index: number = 1,
        @Query('page_size') page_size: number = 30,
        @Query('search') search?: string
    ): Promise<PageResult<TodoSchema>> {
        return this.todoService.findPage({ page_index, page_size }, search);
    }

    /**
     * 标记完成
     */
    @Put(':id/complete')
    async markCompleted(@Param('id') id: string): Promise<TodoSchema> {
        return this.todoService.markCompleted(id);
    }
}
