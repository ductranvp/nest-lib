import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getWinstonLoggerService } from '../lib';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getWinstonLoggerService(),
  });
  await app.listen(3000);
}
bootstrap();
