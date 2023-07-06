import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Referral, ReferralSchema, User, UserSchema } from 'lib/common/src';
import { DatabaseModule } from 'lib/common/src/database';
import ReferralRepository from 'lib/common/src/repositories/referral.repository';
import UserRepository from 'lib/common/src/repositories/user.repository';
import { ReferralController } from './referral.controller';
import { ReferralService } from './referral.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Referral.name, schema: ReferralSchema },
    ]),
  ],
  controllers: [ReferralController],
  providers: [ReferralService, UserRepository, ReferralRepository],
})
export class ReferralModule {}
