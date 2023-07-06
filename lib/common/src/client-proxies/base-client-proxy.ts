import { HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, takeLast } from 'rxjs';

export class BaseClientProxy {
  constructor(private readonly clientProxy: ClientProxy) {}

  send<T>(pattern: any, data: any) {
    return lastValueFrom(
      this.clientProxy
        .send<T>(pattern, data)
        .pipe(takeLast(1))
        .pipe(
          catchError((val) => {
            console.log(val);
            throw new HttpException(val.message, 500);
          }),
        ),
    );
  }
}
