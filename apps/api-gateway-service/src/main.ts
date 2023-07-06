import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ApiGatewayServiceModule } from './api-gateway-service.module';
import helmet from 'helmet';
import morgan from 'morgan';
import { AllExceptionsFilter } from 'lib/common/src/exceptions/all-exceptions-filter';
import { apiServiceName } from 'lib/common/src/constants/services';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayServiceModule);

  const microServiceOptions = {
    transport: Transport.TCP,
    options: {
      host: process.env.API_HOST,
      port: process.env.API_TCP_PORT,
    },
  };

  app.enableCors();
  app.setGlobalPrefix('api');

  app.use(helmet());
  app.use(morgan('combined'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = new Logger(apiServiceName);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, logger));

  app.connectMicroservice(microServiceOptions, { inheritAppConfig: true });

  await app.startAllMicroservices();

  await app.listen(process.env.API_PORT);
}

bootstrap();
