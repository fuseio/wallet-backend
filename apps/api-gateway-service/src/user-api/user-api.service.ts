import { Injectable } from '@nestjs/common';
import { UserClientProxy } from 'lib/common/src/client-proxies';
import { DeleteUserDto, UpdateUserDto } from 'lib/common/src/dtos';
import { AddFCMTokenDto } from 'lib/common/src/dtos/user/add-fcm-token.dto';
import { CreateReferralDto } from 'lib/common/src/dtos/user/create-referral.dto';
import { DeleteFCMTokenDto } from 'lib/common/src/dtos/user/delete-fcm-token.dto';

@Injectable()
export class UserApiService {
  constructor(private readonly userClientProxy: UserClientProxy) {}

  updateUser(updateUserDto: UpdateUserDto) {
    return this.userClientProxy.updateUser(updateUserDto);
  }

  getWalletByPhoneNumber(phoneNumber: string) {
    return this.userClientProxy.getWalletByPhoneNumber(phoneNumber);
  }

  deleteUser(deleteUserDto: DeleteUserDto) {
    return this.userClientProxy.deleteUser(deleteUserDto);
  }

  createReferral(createReferralDto: CreateReferralDto) {
    return this.userClientProxy.createReferral(createReferralDto);
  }

  deleteFCMToken(deleteFCMTokenDto: DeleteFCMTokenDto) {
    return this.userClientProxy.deleteFCMToken(deleteFCMTokenDto);
  }

  addFCMToken(addFCMTokenDto: AddFCMTokenDto) {
    return this.userClientProxy.addFCMToken(addFCMTokenDto);
  }
}
