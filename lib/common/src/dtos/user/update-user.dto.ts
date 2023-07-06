import {
  IsBoolean,
  IsEthereumAddress,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateUserDto {
  id?: string;

  @IsOptional()
  @IsString()
  fcmToken?: string;

  @IsOptional()
  @IsEthereumAddress()
  walletAddress?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  dispayName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  avatarURL?: string;

  @IsOptional()
  @IsBoolean()
  isWalletBackedUp?: boolean;
}
