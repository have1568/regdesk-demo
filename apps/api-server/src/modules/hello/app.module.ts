import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from "../todo/todo.controller";
import { TodoService } from "../todo/todo.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoModule } from "../todo/todo.module";
import { TodoRepository } from "../todo/todo.repository";

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://root:rootpass@localhost:27017/tododb?authSource=admin', {
            autoCreate: true,
        }),
        TodoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
