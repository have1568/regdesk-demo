import { CommonRequest } from "../../core/request/requests";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateTodoRequest extends CommonRequest {

    @IsString()
    title: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsString()
    description?: string;
}


export class UpdateTodoRequest extends CommonRequest {

    @IsString()
    title?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsString()
    description?: string;
}