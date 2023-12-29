/**
 * Title: 'authentication service'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

// user registration

const userRegistration = async (payload: IUser): Promise<IUser | null> => {
  const result = await User.create(payload);
  return result;
};

export const AuthService = {
  userRegistration,
};
