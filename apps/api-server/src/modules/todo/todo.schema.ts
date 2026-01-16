import { BaseSchema, mapping, SchemaScope, scope } from "../../core/response/base.response";
import { TodoEntity } from "../../core/entities/todo.entity";

export class TodoSchema extends BaseSchema<TodoEntity> {

    @scope(SchemaScope.Both)
    @mapping<TodoEntity>(e => e.title)
    title: string;

    @scope(SchemaScope.Both)
    @mapping<TodoEntity>(e => e.completed)
    completed?: boolean;

    @mapping<TodoEntity>(e => e.description)
    @scope(SchemaScope.Both)
    description?: string;

    @scope(SchemaScope.Reference)
    @mapping<TodoEntity>(e => e.created_at)
    created_at?: number;

    @scope(SchemaScope.Reference)
    @mapping<TodoEntity>(e => e.created_by)
    created_by?: string;

    @scope(SchemaScope.Reference)
    @mapping<TodoEntity>(e => e.updated_at)
    updated_at?: number;

    @scope(SchemaScope.Reference)
    @mapping<TodoEntity>(e => e.updated_by)
    updated_by?: string;

}
