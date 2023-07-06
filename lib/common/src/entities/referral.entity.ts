import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Referral extends Document {
  @Prop({ unique: true })
  referreeAddress: string;

  @Prop({ unique: true })
  referreePhoneNumber: string;

  @Prop()
  referrerAddress: string;

  @Prop()
  referrerPhoneNumber: string;
}

export const ReferralSchema = SchemaFactory.createForClass(Referral);
