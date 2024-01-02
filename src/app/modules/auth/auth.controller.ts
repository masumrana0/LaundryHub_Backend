import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import config from '../../../config';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import { Secret } from 'jsonwebtoken';

// userLogin
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.userLogin(loginData);
  const { refreshToken, accessToken, isEmailVerified } = result;
  const responseData = { accessToken, isEmailVerified };
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: responseData,
  });
});

// refreshToken
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

// change password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;

  await AuthService.changePassword(passwordData, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully !',
    data: null,
  });
});

// email verification
const verification = catchAsync(async (req: Request, res: Response) => {
  // Extract the refreshToken from cookies
  const refreshToken = req.cookies.refreshToken;

  // Verify the refreshToken to get the email
  const verifiedUser = jwtHelpers.verifyToken(
    refreshToken as string,
    config.refreshTokenSecret as Secret,
  );

  const { email } = verifiedUser;

  // Call AuthService to verify the email
  await AuthService.verification(email);

  // Send success response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your email is verified successfully!',
    data: null,
  });
});

export const AuthController = {
  userLogin,
  refreshToken,
  changePassword,
  verification,
};
