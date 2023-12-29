/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type IName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  _id?: string;
  name: IName;
  role: 'customer' | 'admin' | 'super_admin';
  password: string;
  phoneNumber: string;
  email: string;
  isEmailVerified: boolean;
  profileImage?: string;
};

export type UserModel = {
  isUserExist(email: string): Promise<IUser>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
