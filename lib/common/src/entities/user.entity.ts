import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Referral } from './referral.entity';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  displayName: string;

  @Prop()
  email: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop({ unique: true })
  referrerAddress: string;

  @Prop()
  avatarURL: string;

  @Prop()
  walletAddress: string;

  @Prop()
  isWalletBackedUp: boolean;

  @Prop()
  fcmTokens: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Referral' })
  referrals: Referral[];
}

export const UserSchema = SchemaFactory.createForClass(User);
