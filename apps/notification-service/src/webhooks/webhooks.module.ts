import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserClientModule } from 'lib/common/src/client-proxies/user-client/user-client.module';
import FirebaseService from 'lib/common/src/services/firebase.service';
import { NotificationsService } from '../common/services/notifications.service';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserClientModule],
  controllers: [WebhooksController],
  providers: [WebhooksService, NotificationsService, FirebaseService],
})
export class WebhooksModule {}
