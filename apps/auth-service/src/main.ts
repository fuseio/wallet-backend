import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import helmet from 'helmet';
import { authServiceName } from 'lib/common/src/constants/services';
import { AllExceptionsFilter } from 'lib/common/src/exceptions/all-exceptions-filter';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);

  const microServiceOptions = {
    transport: Transport.TCP,
    options: {
      host: process.env.AUTH_HOST,
      port: process.env.AUTH_TCP_PORT,
    },
  };

  app.setGlobalPrefix('auth');
  app.enableCors();

  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = new Logger(authServiceName);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, logger));

  app.connectMicroservice(microServiceOptions, { inheritAppConfig: true });

  await app.startAllMicroservices();

  await app.listen(process.env.AUTH_PORT);
}

bootstrap();
