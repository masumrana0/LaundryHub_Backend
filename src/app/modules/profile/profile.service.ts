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
  const result = await User.findByIdAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

export const ProfileService = {
  getUserProfile,
  updateProfile,
};
