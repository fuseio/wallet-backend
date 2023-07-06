import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CommonAuthModule } from 'lib/common/src/auth/common-auth.module';
import { UserClientModule } from 'lib/common/src/client-proxies';
import ChargeService from 'lib/common/src/services/charge.service';
import FirebaseService from 'lib/common/src/services/firebase.service';
import { FirebaseAuthProvider } from './auth-providers/firebase.auth-provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    CommonAuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
      }),
    }),
    HttpModule,
    UserClientModule,
  ],
  controllers: [AuthController],
  providers: [
    ConfigService,
    FirebaseService,
    FirebaseAuthProvider,
    AuthService,
    ChargeService,
  ],
  exports: [],
})
export class AuthModule {}
