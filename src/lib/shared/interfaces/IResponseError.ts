import { HttpStatus } from '@nestjs/common';
import { IErrorDetail } from './IErrorDetail';

export interface IResponseError {
  statusCode: HttpStatus;
  error: IErrorDetail;
  timestamp?: string | Date | number;
}
