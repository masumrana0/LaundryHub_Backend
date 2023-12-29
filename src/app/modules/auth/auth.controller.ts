/**
 * Title: 'authentication controller'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';
import { AuthService } from './auth.service';
import { ILoginUserResponse } from './auth.interface';
import config from '../../../config';
import { Request, Response } from 'express';

// user registration
const userRegistration = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await AuthService.userRegistration(data);
  sendResponse<IUser | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Registration successful',
    data: result,
  });
});

// Login user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken } = result;
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

export const AuthController = {
  userRegistration,
  loginUser,
};