import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const getUserProfile = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email: email });
  return result;
};

const updateProfile = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  let data: Partial<IUser>;
  if (payload.isEmailVerified) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Ha Ha Ha, you are a culprit');
  }
  if (payload.email) {
    data = {
      ...payload,
      isEmailVerified: false,
    };
  } else {
    data = {
      ...payload,
    };
  }
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

export const ProfileService = {
  getUserProfile,
  updateProfile,
};
