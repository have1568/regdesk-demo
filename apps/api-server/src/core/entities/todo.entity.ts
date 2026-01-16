import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TrackableEntity } from "./trackable";

@Schema({ timestamps: true })
export class TodoEntity extends TrackableEntity {

    @Prop({ required: true })
    title: string;

    @Prop({ default: false })
    completed: boolean;

    @Prop()
    description?: string;
}

export const TodoSchema = SchemaFactory.createForClass(TodoEntity);
