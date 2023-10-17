import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  DeleteUserDto,
  GetUserByDto,
  GetUserDto,
  UpdateUserDto,
} from 'lib/common/src/dtos';
import { AddFCMTokenDto } from 'lib/common/src/dtos/user/add-fcm-token.dto';
import { DeleteFCMTokenDto } from 'lib/common/src/dtos/user/delete-fcm-token.dto';
import UserRepository from 'lib/common/src/repositories/user.repository';
import FuseService from 'lib/common/src/services/fuse.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fuseService: FuseService,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  getUser({ id }: GetUserDto) {
    return this.userRepository.findById(id);
  }

  getUserBy(getUserBy: GetUserByDto) {
    return this.userRepository.findBy(getUserBy);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.userRepository.update(updateUserDto.id, updateUserDto);
  }

  async getWalletByPhoneNumber(phoneNumber: string) {
    const { walletAddress, displayName } = await this.userRepository.findBy({
      phoneNumber,
    });
    return { walletAddress, displayName };
  }

  async deleteUser({ id }: DeleteUserDto) {
    try {
      const user = await this.getUser({ id });

      await this.userRepository.delete(id);

      await this.fuseService.unsubscribeFromNotifications([
        user.walletAddress,
      ]);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFCMToken(deleteFCMTokenDto: DeleteFCMTokenDto) {
    return this.userRepository.deleteFCMToken(deleteFCMTokenDto);
  }

  async addFCMToken(addFCMTokenDto: AddFCMTokenDto) {
    return this.userRepository.addFCMToken(addFCMTokenDto);
  }
}
