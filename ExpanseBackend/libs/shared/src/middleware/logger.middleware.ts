import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestDetails: any = {
      url: req.url,
      method: req.method,
    };
    if (process.env.NODE_ENV === 'development') {
      requestDetails.queryString = req.query;
      requestDetails.body = req.body;
    }
    console.log('Request...', { requestDetails });
    next();
  }
}
