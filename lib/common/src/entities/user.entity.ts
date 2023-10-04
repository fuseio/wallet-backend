import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  displayName: string;

  @Prop()
  email: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  avatarURL: string;

  @Prop()
  walletAddress: string;

  @Prop()
  isWalletBackedUp: boolean;

  @Prop()
  fcmTokens: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
