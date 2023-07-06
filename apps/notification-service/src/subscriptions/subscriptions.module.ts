import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import ChargeService from 'lib/common/src/services/charge.service';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [HttpModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, ChargeService],
})
export class SubscriptionsModule {}
