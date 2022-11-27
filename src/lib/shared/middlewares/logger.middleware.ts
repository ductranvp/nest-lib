import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from 'src/lib/shared/utils/custom-logger.util';
import { IRequestLogging } from '../interfaces';
import { generateUUIDV4 } from '../utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new CustomLogger(LoggerMiddleware.name);

  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = generateUUIDV4();
    request.headers['x-request-id'] = requestId;
    request['id'] = requestId;

    const { method, originalUrl, params, body, query } = request;

    const { statusCode } = response;

    const log: IRequestLogging = {
      url: originalUrl,
      method: method,
      statusCode: statusCode,
      body: body,
      params: params,
      query: query,
    };

    this.logger.log(JSON.stringify(log));
    next();
  }
}
