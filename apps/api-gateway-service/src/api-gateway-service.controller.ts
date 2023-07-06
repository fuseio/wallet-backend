import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiGatewayServiceController {
  @Get('health')
  healthCheck() {
    return 'ok';
  }
}
