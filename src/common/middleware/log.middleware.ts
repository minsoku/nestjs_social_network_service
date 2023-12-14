import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class LogMiddleWare implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(
            `[REQ] ${req.url} ${req.method} ${new Date().toLocaleString('kr')}`,
        );

        next();
    }
}
