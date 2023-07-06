import { Module } from '@nestjs/common';
import { AuthClientModule } from 'lib/common/src/client-proxies';
import { AuthApiController } from './auth-api.controller';
import { AuthApiService } from './auth-api.service';

@Module({
  imports: [AuthClientModule],
  providers: [AuthApiService],
  controllers: [AuthApiController],
})
export class AuthApiModule {}
