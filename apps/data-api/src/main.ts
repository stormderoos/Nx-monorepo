import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
  ApiResponseInterceptor,
} from '@avans-nx-workshop/backend/dto';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { environment } from '@avans-nx-workshop/shared/util-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
  };
  app.enableCors(corsOptions);

  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  Logger.log('Running in production mode?', environment.production);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  const appUrl = await app.getUrl();
  Logger.log(`🚀 DATA-API server is running on: ${appUrl}/${globalPrefix}`);
}

bootstrap();