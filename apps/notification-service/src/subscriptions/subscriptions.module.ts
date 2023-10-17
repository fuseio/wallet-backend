import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import FuseService from 'lib/common/src/services/fuse.service';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [HttpModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, FuseService],
})
export class SubscriptionsModule {}
