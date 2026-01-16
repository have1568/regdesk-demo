import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestContext } from "../request/request.context";

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    use(req: Request & { context?: RequestContext }, res: Response, next: NextFunction) {
        try {
            // （可以单提一个中间件）便于维护
            // 解析上下文
            // API 日志
            //校验权限
            //全局异常处理
            next();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}
