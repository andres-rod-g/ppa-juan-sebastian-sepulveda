import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';


export enum EUserRole {
    SU = "SU",
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface IUser {
    name: string;
    role: EUserRole;
    email: string;
    bio: string;
    password: string;
}

class User {
    @prop()
    public name!: string;

    @prop({ required: true, enum: EUserRole })
    public role!: EUserRole;

    @prop()
    public email!: string;

    @prop()
    public phone!: string;

    @prop()
    public password!: string;
}
  
const UserModel = getModelForClass(User);
export default UserModel;