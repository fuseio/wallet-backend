import {
  Controller,
  UseGuards,
  Get,
  Req,
  Put,
  Body,
  Delete,
  Post,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard, UpdateUserDto } from 'lib/common/src';
import { UserId } from 'lib/common/src/decorators/user-id.decorator';
import { CreateReferralDto } from 'lib/common/src/dtos/user/create-referral.dto';
import { UserApiService } from './user-api.service';
import { DeleteFCMTokenRequestBody } from 'lib/common/src/dtos/user/delete-fcm-token-request-body';
import { AddFCMTokenRequestBody } from 'lib/common/src/dtos/user/add-fcm-token-request-body';

@Controller('/user')
@UseGuards(JwtAuthGuard)
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}

  @Get('/')
  getUser(@Req() req) {
    return req.user;
  }

  @Get('/wallet_by_phone/:phoneNumber')
  getWalletByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.userApiService.getWalletByPhoneNumber(phoneNumber);
  }

  @Put('/')
  updateUser(@UserId() id, @Body() updateUserDto: UpdateUserDto) {
    return this.userApiService.updateUser({
      id,
      ...updateUserDto,
    });
  }

  @Delete('/')
  async deleteUser(@UserId() id) {
    await this.userApiService.deleteUser({ id });
    return { response: 'ok' };
  }

  @Post('/createReferral')
  createReferral(@Body() createReferralDto: CreateReferralDto) {
    return this.userApiService.createReferral(createReferralDto);
  }

  @Delete('/fcmToken')
  async deleteFCMToken(
    @UserId() id,
    @Body() deleteFCMTokenRequestBody: DeleteFCMTokenRequestBody,
  ) {
    await this.userApiService.deleteFCMToken({
      userID: id,
      fcmToken: deleteFCMTokenRequestBody.fcmToken,
    });

    return { response: 'ok' };
  }

  @Post('fcmToken')
  async addFCMToken(
    @UserId() userID,
    @Body() addFCMTokenRequestBody: AddFCMTokenRequestBody,
  ) {
    this.userApiService.addFCMToken({
      userID: userID,
      fcmToken: addFCMTokenRequestBody.fcmToken,
    });
  }
}
