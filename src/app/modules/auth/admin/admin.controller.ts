import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../../shared/catchAsync';
import { ILoginUserResponse } from '../customer/auth.interface';
import sendResponse from '../../../../shared/sendResponse';
import config from '../../../../config';
import { AdminService } from './admin.service';

// user registration with login
const adminRegistration = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AdminService.adminRegistration(userData);
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
    message: 'User Registration in successfully !',
    data: responseData,
  });
});

// Login user
const adminLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AdminService.adminLogin(loginData);
  const { refreshToken, accessToken, isEmailVerified } = result;
  const responseData = { accessToken, isEmailVerified };
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
    data: responseData,
  });
});

export const AdminController = {
  adminRegistration,
  adminLogin,
};
