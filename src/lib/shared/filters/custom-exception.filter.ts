import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';
import { CustomException } from '../exceptions';
import { Response } from 'express';
import { IResponseError } from '../interfaces';
import { NestReadyOptions } from '../../nest-ready.module';
import { MODULE_OPTION_KEY } from '../constants';
import { CustomLogger } from '../utils';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new CustomLogger(CustomExceptionFilter.name);

  constructor(@Inject(MODULE_OPTION_KEY) private options: NestReadyOptions) {}

  catch(exception: CustomException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    this.logger.error({
      message: exception.error?.message,
      stack: exception.stack,
    });

    const { statusCode, error } = exception;

    const errorBody: IResponseError = {
      error: error,
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
    };

    response.status(exception.statusCode).json(errorBody);
  }
}
