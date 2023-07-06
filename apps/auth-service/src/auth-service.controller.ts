import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthServiceController {
  @Get('health')
  healthCheck() {
    return 'ok';
  }
}
