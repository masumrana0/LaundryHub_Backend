export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  isEmailVerified: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
