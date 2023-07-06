import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReferralModule } from './referral/referral.module';
import { UserServiceController } from './user-service.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ReferralModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [UserServiceController],
  providers: [],
})
export class UserServiceModule {}
