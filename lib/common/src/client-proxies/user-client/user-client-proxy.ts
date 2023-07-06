import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { userServiceName } from '../../constants/services';
import {
  CreateUserDto,
  DeleteUserDto,
  GetUserByDto,
  GetUserDto,
  UpdateUserDto,
} from '../../dtos';
import { CreateReferralDto } from '../../dtos/user/create-referral.dto';
import { User } from '../../entities';
import { BaseClientProxy } from '../base-client-proxy';
import { DeleteFCMTokenDto } from '../../dtos/user/delete-fcm-token.dto';
import { AddFCMTokenDto } from '../../dtos/user/add-fcm-token.dto';

@Injectable()
export class UserClientProxy extends BaseClientProxy {
  constructor(
    @Inject(userServiceName)
    clientProxy: ClientProxy,
  ) {
    super(clientProxy);
  }

  createUser(createUserDto: CreateUserDto) {
    return this.send<User>('create_user', createUserDto);
  }

  getWalletByPhoneNumber(phoneNumber: string) {
    return this.send('get_wallet_by_phone', phoneNumber);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.send<User>('update_user', updateUserDto);
  }

  findUser(getUserDto: GetUserDto) {
    return this.send<User | null>('get_user', getUserDto);
  }

  findUserBy(getUserByDto: GetUserByDto) {
    return this.send<User | null>('get_user_by', getUserByDto);
  }

  deleteUser(deleteUserDto: DeleteUserDto) {
    return this.send('delete_user', deleteUserDto);
  }

  createReferral(createReferralDto: CreateReferralDto) {
    return this.send('create_referral', createReferralDto);
  }

  deleteFCMToken(deleteFCMTokenDto: DeleteFCMTokenDto) {
    return this.send('delete_fcm_token', deleteFCMTokenDto);
  }

  addFCMToken(addFCMTokenDto: AddFCMTokenDto) {
    return this.send('add_fcm_token', addFCMTokenDto);
  }
}
