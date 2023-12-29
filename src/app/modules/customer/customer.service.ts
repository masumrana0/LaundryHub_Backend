import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { AuthService } from '../auth/auth.service';
import { ILoginUserResponse } from '../auth/auth.interface';

// user registration
const customerRegistration = async (
  payload: IUser,
): Promise<ILoginUserResponse> => {
  payload.role = 'customer';

  const result = await User.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something is wrong');
  }

  const loginData = { email: result?.email, password: payload?.password };
  const token = AuthService.loginUser(loginData);

  return token;
};

export const CustomerService = {
  customerRegistration,
};
