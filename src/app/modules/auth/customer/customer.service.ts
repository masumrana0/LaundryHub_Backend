/**
 * Title: 'authentication service'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../../config';
import ApiError from '../../../../errors/ApiError';
import { jwtHelpers } from '../../../../helper/jwtHelpers';
import { IUser } from '../../user/user.interface';
import { User } from '../../user/user.model';
import { ILoginUser, ILoginUserResponse } from '../auth.interface';

// user registration
const userRegistration = async (
  payload: IUser,
): Promise<ILoginUserResponse> => {
  if (!payload.role) {
    payload.role = 'customer';
  }

  const result = await User.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something is wrong');
  }

  const loginData = { email: result?.email, password: payload?.password };
  const token = await loginUser(loginData);

  return token;
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
  const { _id, role, email: Email, isEmailVerified } = isUserExist;

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
    isEmailVerified,
  };
};

export const AuthService = {
  userRegistration,
  loginUser,
};
