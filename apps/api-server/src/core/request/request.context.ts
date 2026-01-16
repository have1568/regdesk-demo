import { ObjectId } from "mongoose";

export interface RequestContext {
    oid: string;
    token: string,
    org_id: ObjectId;
}