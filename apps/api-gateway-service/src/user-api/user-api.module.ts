import { Module } from '@nestjs/common';
import { UserClientModule } from 'lib/common/src/client-proxies';
import { UserApiController } from './user-api.controller';
import { UserApiService } from './user-api.service';

@Module({
  imports: [UserClientModule],
  providers: [UserApiService],
  controllers: [UserApiController],
})
export class UserApiModule {}
