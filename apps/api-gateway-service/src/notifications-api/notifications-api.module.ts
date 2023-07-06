import { Module } from '@nestjs/common';
import { NotificationClientModule } from 'lib/common/src/client-proxies';
import { NotificationsApiController } from './notifications-api.controller';
import { NotificationsApiService } from './notifications-api.service';

@Module({
  imports: [NotificationClientModule],
  providers: [NotificationsApiService],
  controllers: [NotificationsApiController],
})
export class NotificationsApiModule {}
