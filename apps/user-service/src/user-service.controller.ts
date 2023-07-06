import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserServiceController {
  @Get('health')
  healthCheck() {
    return 'ok';
  }
}
