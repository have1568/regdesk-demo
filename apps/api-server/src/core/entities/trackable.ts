import { Document, ObjectId } from "mongoose";

export abstract class TrackableEntity extends Document {
    created_at?: number;
    created_by?: string;
    updated_at?: number;
    updated_by?: string;
}
