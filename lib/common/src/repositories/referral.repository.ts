import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetReferralDto } from '../dtos/user/get-referral.dto';
import { Referral } from '../entities/referral.entity';

@Injectable()
export default class ReferralRepository {
  constructor(
    @InjectModel(Referral.name) private readonly referralModel: Model<Referral>,
  ) {}

  create(data: {
    referreeAddress: string;
    referreePhoneNumber: string;
    referrerAddress: string;
    referrerPhoneNumber: string;
  }) {
    return this.referralModel.create(data);
  }

  getBy(getReferralDto: GetReferralDto) {
    return this.referralModel.findOne(getReferralDto);
  }
}
