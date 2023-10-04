import { Injectable } from '@nestjs/common';
import { UserClientProxy } from 'lib/common/src/client-proxies';
import { DeleteUserDto, UpdateUserDto } from 'lib/common/src/dtos';
import { AddFCMTokenDto } from 'lib/common/src/dtos/user/add-fcm-token.dto';
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

  deleteFCMToken(deleteFCMTokenDto: DeleteFCMTokenDto) {
    return this.userClientProxy.deleteFCMToken(deleteFCMTokenDto);
  }

  addFCMToken(addFCMTokenDto: AddFCMTokenDto) {
    return this.userClientProxy.addFCMToken(addFCMTokenDto);
  }
}
