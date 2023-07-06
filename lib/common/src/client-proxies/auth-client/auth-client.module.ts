import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { authServiceName } from '../../constants/services';
import { AuthClientProxy } from './auth-client-proxy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: authServiceName,
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_HOST,
          port: parseInt(process.env.AUTH_TCP_PORT),
        },
      },
    ]),
  ],
  providers: [AuthClientProxy],
  exports: [AuthClientProxy],
})
export class AuthClientModule {}
