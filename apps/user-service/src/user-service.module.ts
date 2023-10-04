import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserServiceController } from './user-service.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UserServiceController],
  providers: [],
})
export class UserServiceModule {}
