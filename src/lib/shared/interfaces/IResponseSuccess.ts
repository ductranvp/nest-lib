import { HttpStatus } from '@nestjs/common';

export interface IResponseSuccess {
  statusCode: HttpStatus;
  data: any;
}
