import { Injectable } from '@nestjs/common';
import { LoginUserDto } from 'lib/common/src/dtos/auth/login-user.dto';
import { AuthClientProxy } from 'lib/common/src/client-proxies';

@Injectable()
export class AuthApiService {
  constructor(private readonly authClientProxy: AuthClientProxy) {}

  login(loginUserDto: LoginUserDto) {
    return this.authClientProxy.login(loginUserDto);
  }
}
