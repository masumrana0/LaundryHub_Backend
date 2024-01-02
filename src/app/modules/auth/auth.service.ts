import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { JwtPayload, Secret } from 'jsonwebtoken';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
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

// refresh Token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.refreshTokenSecret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { email: Email } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(Email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExist._id,
      role: isUserExist.role,
      email: isUserExist.email,
    },
    config.accessTokenSecret as Secret,
    config.accessTokenExpireIn as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

// changePassword
const changePassword = async (
  payload: IChangePassword,
  user: JwtPayload | null,
): Promise<void> => {
  const { oldPassord, newPassword } = payload;

  // checking user existed
  const isUserExist = await User.findById(user?.userid);
  // console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassord, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'old password is incorrect');
  }

  isUserExist.password = newPassword;
  isUserExist.isPasswordChanged = true;

  // save the updated password
  isUserExist.save();
};

export const AuthService = {
  userLogin,
  refreshToken,
  changePassword,
};
