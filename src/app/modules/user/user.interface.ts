type IName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  name: IName;
  role: 'customer' | 'admin' | 'super_admin';
  password: string;
  phoneNumber: string;
  email: string;
  isEmailVerified: boolean;
  profileImage?: string;
};
