import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomException } from '../lib';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  testException(): string {
    throw new CustomException(HttpStatus.BAD_REQUEST, {
      code: '400',
      message: 'account.notFound',
    });
  }
}
