import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, JsonRpcProvider, Wallet } from 'ethers';

@Injectable()
export class Web3Provider {
  private readonly rpcProvider: JsonRpcProvider;
  private readonly wallet: Wallet;

  constructor(private readonly configService: ConfigService) {
    const rpc = this.configService.getOrThrow('RPC_URL');
    const privateKey = this.configService.getOrThrow('PRIVATE_KEY');

    this.rpcProvider = new ethers.JsonRpcProvider(rpc);

    this.wallet = new ethers.Wallet(privateKey, this.rpcProvider);
  }

  provider() {
    return this.rpcProvider;
  }

  signer() {
    return this.wallet;
  }
}
