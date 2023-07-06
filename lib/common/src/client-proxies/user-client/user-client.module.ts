import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { userServiceName } from '../../constants/services';
import { UserClientProxy } from './user-client-proxy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: userServiceName,
        transport: Transport.TCP,
        options: {
          host: process.env.USER_HOST,
          port: parseInt(process.env.USER_TCP_PORT),
        },
      },
    ]),
  ],
  providers: [UserClientProxy],
  exports: [UserClientProxy],
})
export class UserClientModule {}
