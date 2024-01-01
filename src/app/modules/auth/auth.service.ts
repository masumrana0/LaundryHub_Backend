import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { Secret } from 'jsonwebtoken';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import config from '../../../config';

// login user
const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
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
    config.accessTokenSecret as Secret,
    config.accessTokenExpireIn as string,
  );

  // create refreshToken
  const refreshToken = jwtHelpers.createToken(
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
  userLogin,
};
