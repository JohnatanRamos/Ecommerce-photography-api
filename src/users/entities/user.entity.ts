import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  correo: string;

  @Prop({ required: true })
  celular: string;

  @Prop({ required: true })
  indicativo: string;

  @Prop({ required: true })
  autoriza: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
