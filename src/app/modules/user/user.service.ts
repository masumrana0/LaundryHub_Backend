import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const getAllUser = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  return result;
};
const getOneUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};
const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

export const UserService = {
  getAllUser,
  getOneUser,
  updateUser,
};
