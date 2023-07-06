import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'lib/common/src';
import { AuthApiService } from './auth-api.service';

@Controller('/auth')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authApiService.login(loginUserDto);
  }
}
