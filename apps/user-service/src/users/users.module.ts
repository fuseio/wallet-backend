import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'lib/common/src';
import { DatabaseModule } from 'lib/common/src/database/database.module';
import UserRepository from 'lib/common/src/repositories/user.repository';
import FuseService from 'lib/common/src/services/fuse.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, FuseService],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
