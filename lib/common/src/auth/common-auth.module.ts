import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserClientModule } from '../client-proxies/user-client/user-client.module';
import { JwtStrategy } from './strategy';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserClientModule],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class CommonAuthModule {}
