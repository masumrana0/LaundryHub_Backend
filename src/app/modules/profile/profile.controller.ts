import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ProfileService } from './profile.service';
import { IUser } from '../user/user.interface';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ProfileService.getUserProfile(user?.email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fatched successfully !',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.userid;
  const updatedData = req.body;
  const result = await ProfileService.updateProfile(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user profile is updated  successfully !',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
  updateProfile,
};
