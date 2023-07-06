import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AuthServiceController],
})
export class AuthServiceModule {}
