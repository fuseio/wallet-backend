import { IsEthereumAddress, IsPhoneNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  firebaseIDToken: string;

  @IsEthereumAddress()
  walletAddress: string;

  @IsPhoneNumber()
  phoneNumber: string;
}
