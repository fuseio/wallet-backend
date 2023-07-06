import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { notificationsServiceName } from '../../constants/services';
import { NotificationClientProxy } from './notification-client-proxy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: notificationsServiceName,
        transport: Transport.TCP,
        options: {
          host: process.env.NOTIFICATION_HOST,
          port: parseInt(process.env.NOTIFICATION_TCP_PORT),
        },
      },
    ]),
  ],
  providers: [NotificationClientProxy],
  exports: [NotificationClientProxy],
})
export class NotificationClientModule {}
