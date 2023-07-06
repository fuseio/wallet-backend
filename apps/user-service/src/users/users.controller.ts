import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateUserDto,
  DeleteUserDto,
  GetUserByDto,
  GetUserDto,
  UpdateUserDto,
} from 'lib/common/src/dtos';
import { UsersService } from './users.service';
import { DeleteFCMTokenDto } from 'lib/common/src/dtos/user/delete-fcm-token.dto';
import { AddFCMTokenDto } from 'lib/common/src/dtos/user/add-fcm-token.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create_user')
  createUser(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @MessagePattern('get_wallet_by_phone')
  getWalletByPhoneNumber(phoneNumber: string) {
    return this.usersService.getWalletByPhoneNumber(phoneNumber);
  }

  @MessagePattern('get_user')
  getUser(getUserDto: GetUserDto) {
    return this.usersService.getUser(getUserDto);
  }

  @MessagePattern('get_user_by')
  getUserBy(getUserByDto: GetUserByDto) {
    return this.usersService.getUserBy(getUserByDto);
  }

  @MessagePattern('update_user')
  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  @MessagePattern('delete_user')
  deleteUser(deleteUserDto: DeleteUserDto) {
    return this.usersService.deleteUser(deleteUserDto);
  }

  @MessagePattern('delete_fcm_token')
  deleteFCMToken(deleteFCMTokenDto: DeleteFCMTokenDto) {
    return this.usersService.deleteFCMToken(deleteFCMTokenDto);
  }

  @MessagePattern('add_fcm_token')
  addFCMToken(addFCMTokenDto: AddFCMTokenDto) {
    return this.usersService.addFCMToken(addFCMTokenDto);
  }
}
