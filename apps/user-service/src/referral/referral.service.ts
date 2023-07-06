import { Injectable } from '@nestjs/common';
import { CreateReferralDto } from 'lib/common/src/dtos/user/create-referral.dto';
import { GetReferralDto } from 'lib/common/src/dtos/user/get-referral.dto';
import ReferralRepository from 'lib/common/src/repositories/referral.repository';
import UserRepository from 'lib/common/src/repositories/user.repository';

@Injectable()
export class ReferralService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly referralRepository: ReferralRepository,
  ) {}

  async createReferral({
    referreeAddress,
    referreePhoneNumber,
    referrerAddress,
  }: CreateReferralDto) {
    const user = await this.userRepository.findBy({
      phoneNumber: referreePhoneNumber,
    });
    if (!user) throw new Error('User does not exist.');

    if (user.referrerAddress !== referrerAddress)
      throw new Error('User already has a referral address.');

    const referral = await this.getReferral({
      referreePhoneNumber,
    });

    if (!referral) throw new Error('Referral for user already registered');

    const referrerUser = await this.userRepository.findBy({
      walletAddress: referrerAddress,
    });

    const newReferral = await this.referralRepository.create({
      referreeAddress,
      referreePhoneNumber,
      referrerAddress,
      referrerPhoneNumber: referrerUser.phoneNumber,
    });

    referrerUser.referrals.push(newReferral._id);

    await referrerUser.save();

    return newReferral;
  }

  async getReferral(getReferralDto: GetReferralDto) {
    return this.referralRepository.getBy(getReferralDto);
  }
}
