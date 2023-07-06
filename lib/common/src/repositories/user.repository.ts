import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { User } from '../entities/user.entity';
import { DeleteFCMTokenDto } from '../dtos/user/delete-fcm-token.dto';
import { AddFCMTokenDto } from '../dtos/user/add-fcm-token.dto';

@Injectable()
export default class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create({ query, data }: CreateUserDto) {
    return this.userModel.findOneAndUpdate(
      query,
      {
        $set: data,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  findBy(filterQuery: FilterQuery<User>) {
    return this.userModel.findOne(filterQuery);
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  delete(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  dtoToModel(dto: any) {
    return new this.userModel(dto);
  }

  deleteFCMToken({ userID, fcmToken }: DeleteFCMTokenDto) {
    return this.userModel.findByIdAndUpdate(userID, {
      $pull: { fcmTokens: fcmToken },
    });
  }

  addFCMToken({ userID, fcmToken }: AddFCMTokenDto) {
    return this.userModel.findByIdAndUpdate(userID, {
      $addToSet: { fcmTokens: fcmToken },
    });
  }
}
