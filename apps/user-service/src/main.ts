import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import helmet from 'helmet';
import { userServiceName } from 'lib/common/src/constants/services';
import { AllExceptionsFilter } from 'lib/common/src/exceptions/all-exceptions-filter';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);

  const microServiceOptions = {
    transport: Transport.TCP,
    options: {
      host: process.env.USER_HOST,
      port: process.env.USER_TCP_PORT,
    },
  };

  app.enableCors();

  app.setGlobalPrefix('user');

  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = new Logger(userServiceName);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, logger));

  app.connectMicroservice(microServiceOptions, { inheritAppConfig: true });

  await app.startAllMicroservices();

  await app.listen(process.env.USER_PORT);
}

bootstrap();
