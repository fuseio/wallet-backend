import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from 'lib/common/src/dtos/auth/login-user.dto';
import { authServiceName } from '../../constants/services';
import { BaseClientProxy } from '../base-client-proxy';

@Injectable()
export class AuthClientProxy extends BaseClientProxy {
  constructor(@Inject(authServiceName) clientProxy: ClientProxy) {
    super(clientProxy);
  }

  login(loginUserDto: LoginUserDto) {
    return this.send('login', loginUserDto);
  }
}
