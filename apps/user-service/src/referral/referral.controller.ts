import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateReferralDto } from 'lib/common/src/dtos/user/create-referral.dto';
import { ReferralService } from './referral.service';

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @MessagePattern('create_referral')
  createReferral(createReferralDto: CreateReferralDto) {
    return this.referralService.createReferral(createReferralDto);
  }
}
