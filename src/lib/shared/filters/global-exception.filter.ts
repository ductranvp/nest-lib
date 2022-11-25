import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { IResponseError } from '../interfaces';
import { NestReadyOptions } from '../../nest-ready.module';
import { MODULE_OPTION_KEY } from '../constants';
import { CustomLogger } from '../utils';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new CustomLogger(GlobalExceptionFilter.name);

  constructor(@Inject(MODULE_OPTION_KEY) private options: NestReadyOptions) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = this.options.errorMessages.internalErrorMessage;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const errorResponse = exception.getResponse();
      message = (errorResponse as any)?.message;
    }

    this.logger.error({ message: exception.message, stack: exception.stack });

    const errorBody: IResponseError = {
      error: {
        code: statusCode,
        message: message,
      },
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
    };

    response.status(statusCode).json(errorBody);
  }
}
