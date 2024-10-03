import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
import { Role } from '../auth/roles.enum';
@Schema()
export class User {
  @Prop({ required: true })
  name: string;  

  @Prop({ required: true, unique: true })
  email: string;  
  @Prop({ required: true })
  password: string; 

  @Prop({ required: true })
  phoneNumber: string;  

  @Prop()
  address?: string;  

  @Prop({ type: String, enum: Role, default: Role.Buyer })
  role: string; 

  @Prop()
  refreshToken?: string;  
}

export const UserSchema = SchemaFactory.createForClass(User);
