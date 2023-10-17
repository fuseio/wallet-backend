import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, lastValueFrom, catchError } from 'rxjs';

@Injectable()
export default class FuseService {
  private readonly baseUrl: string;
  private readonly secretKey: string;
  private readonly publicApiKey: string;
  private readonly webhookId: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.getOrThrow('FUSE_BASE_URL');
    this.secretKey = this.configService.getOrThrow('FUSE_SECRET_KEY');
    this.publicApiKey = this.configService.getOrThrow('FUSE_PUBLIC_API_KEY');
    this.webhookId = this.configService.getOrThrow('FUSE_WEBHOOK_ID');
  }

  async subscribeToNotifications(addresses: Array<string>) {
    return this.httpPost(
      `${this.baseUrl}/notifications/webhook/add-addresses?apiKey=${this.publicApiKey}`,
      {
        addresses,
        webhookId: this.webhookId,
      },
    );
  }

  async unsubscribeFromNotifications(addresses: Array<string>) {
    return this.httpPost(
      `${this.baseUrl}/notifications/webhook/delete-addresses?apiKey=${this.publicApiKey}`,
      {
        addresses,
        webhookId: this.webhookId,
      },
    );
  }

  async httpPost(url: string, data: any) {
    const response = await lastValueFrom(
      this.httpService
        .post(url, data, { headers: { 'API-SECRET': this.secretKey } })
        .pipe(map((res) => res.data))

        .pipe(
          catchError((e) => {
            console.log(e);
            throw new HttpException(
              e?.response?.statusText,
              e?.response?.status,
            );
          }),
        ),
    );

    return response;
  }
}
