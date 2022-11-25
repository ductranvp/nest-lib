import { HttpStatus } from '@nestjs/common';

export interface IRequestLogging {
  statusCode: HttpStatus | string;
  method: string;
  url: string;
  body: any;
  params: any;
  query: any;
}
