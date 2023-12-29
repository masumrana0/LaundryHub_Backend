/**
 * Title: 'user Schema'
 * Description: 'handle user Schema.and createing User Schema and  other fucntionalities'
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import { userRole } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../../config';

const UserSchema = new Schema<IUser>({
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
    },
    required: true,
  },
  role: {
    type: String,
    enum: userRole,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre('save', async function (next) {
  // hasning user password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<IUser>('user', UserSchema);
