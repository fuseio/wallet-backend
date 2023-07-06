import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonAuthModule } from 'lib/common/src/auth/common-auth.module';
import { ApiGatewayServiceController } from './api-gateway-service.controller';
import { AuthApiModule } from './auth-api/auth-api.module';
import { NotificationsApiModule } from './notifications-api/notifications-api.module';
import { UserApiModule } from './user-api/user-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthApiModule,
    NotificationsApiModule,
    UserApiModule,
    CommonAuthModule,
  ],
  controllers: [ApiGatewayServiceController],
})
export class ApiGatewayServiceModule {}
