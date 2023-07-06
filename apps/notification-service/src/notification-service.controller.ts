import { Controller, Get } from '@nestjs/common';

@Controller()
export class NotificationServiceController {
  @Get('health')
  healthCheck() {
    return 'ok';
  }
}
