/**
 * Title: 'authentication service'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import httpStatus from 'http-status';
import ApiError from '../../../../errors/ApiError';
import { IUser } from '../../user/user.interface';
import { User } from '../../user/user.model';
import { IDataValidationResponse, ILoginUserResponse } from '../auth.interface';
import { AuthService } from '../auth.service';
import validationResponse from '../../../../shared/validationResponse';

// customer registration
const customerRegistration = async (
  payload: IUser,
): Promise<ILoginUserResponse | IDataValidationResponse> => {
  if (!payload.role) {
    payload.role = 'customer';
  }

  const isNotUniqueEmail = await User.isUserExist(payload.email);
  if (isNotUniqueEmail) {
    return validationResponse('Sorry, this email address is already in use.');
  }

  const result = await User.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something is wrong');
  }
  // await AuthService.sendEmailVerificationMail(result.email);

  const loginData = { email: result?.email, password: payload?.password };
  const token = await AuthService.userLogin(loginData);

  return token;
};

export const CustomerService = {
  customerRegistration,
};
