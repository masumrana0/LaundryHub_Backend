/**
 * Title: 'authentication service'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

// user registration
const userRegistration = async (
  payload: IUser | null,
): Promise<IUser | null> => {
  const result = await User.create(payload);
  return result;
};

// login user
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // checking isUserExist
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // matching password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is inccorect');
  }

  // create accessToken & refresh token
  const { _id, role, email: Email } = isUserExist;

  // create accessToken
  const accessToken = jwtHelpers.createToken(
    {
      userid: _id,
      role: role,
      email: Email,
    },
    config.accessTokenExpireIn as Secret,
    config.accessTokenExpireIn as string,
  );

  // create refreshToken
  const refreshToken = jwtHelpers.createResetToken(
    {
      userid: _id,
      role: role,
      email: Email,
    },
    config.refreshTokenSecret as Secret,
    config.refreshTokenExpireIn as string,
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  userRegistration,
  loginUser,
};
