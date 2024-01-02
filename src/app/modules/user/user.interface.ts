/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type IName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  save(): unknown;
  _id?: string;
  name: IName;
  role: 'customer' | 'admin' | 'super_admin';
  password: string;
  phoneNumber: string;
  email: string;
  passwordChangedAt?: Date;
  isPasswordChanged: boolean;
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
