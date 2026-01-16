import { TrackableRepository } from "../../core/repositories/trackable";
import { TodoEntity } from "../../core/entities/todo.entity";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TodoRepository extends TrackableRepository<TodoEntity> {
    constructor(
        @InjectModel(TodoEntity.name)
        todoModel: Model<TodoEntity>,
    ) {
        super(todoModel);
    }
}
