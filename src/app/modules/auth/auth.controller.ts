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

// user registration
const userRegistration = catchAsync(async (req: Request, res: Response) => {
  const { ...registrationData } = req.body;

  const result = await AuthService.userRegistration(registrationData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Registration successful',
    data: result,
  });
});

export const AuthController = {
  userRegistration,
};
