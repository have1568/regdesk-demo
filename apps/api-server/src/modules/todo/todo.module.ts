import { Module } from '@nestjs/common';
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoEntity, TodoSchema } from "../../core/entities/todo.entity";
import { TodoRepository } from "./todo.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TodoEntity.name, schema: TodoSchema },
        ]),
    ],
    controllers: [TodoController],
    providers: [
        TodoService,
        TodoRepository
    ],
    exports: [TodoService, TodoRepository], // 可跨模块使用
})
export class TodoModule {}
