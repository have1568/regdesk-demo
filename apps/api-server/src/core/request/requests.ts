import { RequestContext } from "./request.context";
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';


export interface RequestBase<C extends RequestContext = RequestContext> {

    context?: C;
}

export class CommonRequest implements RequestBase {
    context?: RequestContext;
}

export class PageRequest implements RequestBase {

    context?: RequestContext;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    page_index: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page_size: number = 30;


}