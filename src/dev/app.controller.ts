import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomLogger } from '../lib';

@Controller()
export class AppController {
  private readonly logger = new CustomLogger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log('Get hello');
    return this.appService.getHello();
  }
}
