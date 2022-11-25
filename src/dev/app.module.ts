import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware, NestReadyModule } from '../lib';
import { I18nModule } from 'nestjs-i18n';
import { i18nConfig } from './configs/i18n.config';

@Module({
  imports: [NestReadyModule.register(), I18nModule.forRoot(i18nConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
