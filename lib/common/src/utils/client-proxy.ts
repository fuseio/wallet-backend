import { HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, takeLast, catchError } from 'rxjs';

export async function callMSFunction(
  client: ClientProxy,
  pattern: string,
  data: any,
) {
  return lastValueFrom(
    client
      .send(pattern, data)
      .pipe(takeLast(1))
      .pipe(
        catchError((val) => {
          console.log(val);
          throw new HttpException(val.message, 500);
        }),
      ),
  );
}
