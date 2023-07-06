import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import helmet from 'helmet';
import { notificationsServiceName } from 'lib/common/src/constants/services';
import { AllExceptionsFilter } from 'lib/common/src/exceptions/all-exceptions-filter';
import { NotificationServiceModule } from './notifcation-service.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationServiceModule);

  const microServiceOptions = {
    transport: Transport.TCP,
    options: {
      host: process.env.NOTIFICATION_HOST,
      port: process.env.NOTIFICATION_TCP_PORT,
    },
  };

  app.setGlobalPrefix('notification');
  app.enableCors();

  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = new Logger(notificationsServiceName);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, logger));

  app.connectMicroservice(microServiceOptions, { inheritAppConfig: true });

  await app.startAllMicroservices();

  await app.listen(process.env.NOTIFICATION_PORT);
}

bootstrap();
