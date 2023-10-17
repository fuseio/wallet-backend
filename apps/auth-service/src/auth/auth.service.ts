import { FirebaseAuthProvider } from './auth-providers/firebase.auth-provider';
import { JwtService } from '@nestjs/jwt';
import {
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserClientProxy } from 'lib/common/src/client-proxies';
import { LoginUserDto } from 'lib/common/src/dtos';
import FuseService from 'lib/common/src/services/fuse.service';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly firebaseAuthProvider: FirebaseAuthProvider,
    private readonly jwtService: JwtService,
    private readonly userClientProxy: UserClientProxy,
    private readonly fuseService: FuseService,
  ) {}

  async loginUser({ walletAddress, firebaseIDToken }: LoginUserDto) {
    try {
      const { phone_number: phoneNumber } =
        await this.firebaseAuthProvider.authenticate(firebaseIDToken);

      const existingUser = await this.userClientProxy.findUserBy({
        phoneNumber,
      });

      const createdOrUpdatedUser = await this.userClientProxy.createUser({
        query: { phoneNumber },
        data: { phoneNumber, walletAddress },
      });

      // TODO: add a retry job queue
      if (!existingUser && createdOrUpdatedUser) {
        await this.fuseService.subscribeToNotifications([
          createdOrUpdatedUser.walletAddress,
        ]);
      }

      if (
        createdOrUpdatedUser &&
        existingUser &&
        createdOrUpdatedUser.walletAddress !== existingUser.walletAddress
      ) {
        await this.fuseService.unsubscribeFromNotifications([
          existingUser.walletAddress,
        ]);
      }

      return this.jwtService.sign({ id: createdOrUpdatedUser._id });
    } catch (error) {
      this.logger.error(error);

      if (
        error.code === 'auth/argument-error' ||
        error.code === 'auth/id-token-expired'
      ) {
        throw new UnauthorizedException(error.message);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
