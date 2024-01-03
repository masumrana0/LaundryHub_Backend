import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { JwtPayload, Secret } from 'jsonwebtoken';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import config from '../../../config';
import { IUser } from '../user/user.interface';
import { sendMailerHelper } from '../../../helper/sendMailHelper';

// login user
const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // checking isUserExist
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // matching password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is inccorect');
  }

  // create accessToken & refresh token
  const { _id, role, email: Email, isEmailVerified } = isUserExist;

  // create accessToken
  const accessToken = jwtHelpers.createToken(
    {
      userid: _id,
      role: role,
      email: Email,
    },
    config.accessTokenSecret as Secret,
    config.accessTokenExpireIn as string,
  );

  // create refreshToken
  const refreshToken = jwtHelpers.createToken(
    {
      userid: _id,
      role: role,
      email: Email,
    },
    config.refreshTokenSecret as Secret,
    config.refreshTokenExpireIn as string,
  );

  return {
    accessToken,
    refreshToken,
    isEmailVerified,
  };
};

// refresh Token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.refreshTokenSecret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { email: Email } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(Email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExist._id,
      role: isUserExist.role,
      email: isUserExist.email,
    },
    config.accessTokenSecret as Secret,
    config.accessTokenExpireIn as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

// changePassword
const changePassword = async (
  payload: IChangePassword,
  user: JwtPayload | null,
): Promise<void> => {
  const { oldPassord, newPassword } = payload;

  // checking user existed
  const isUserExist = await User.findById(user?.userid);
  // console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassord, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'old password is incorrect');
  }

  isUserExist.password = newPassword;
  isUserExist.isPasswordChanged = true;

  // save the updated password
  isUserExist.save();
};

// email verification
const verification = async (email: string): Promise<void> => {
  // Retrieve the user by email
  const isUserExist: IUser | null = await User.findOne({
    email: email,
  });

  // Check if the user exists
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check if the email is already verified
  if (isUserExist && isUserExist.isEmailVerified) {
    throw new ApiError(httpStatus.OK, 'Your email is already Verified');
  }

  // update email verified data
  const result = await User.findByIdAndUpdate(
    isUserExist._id,
    { isEmailVerified: true },
    { new: true },
  );

  // Check if the email is verified
  if (!result?.isEmailVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email verification failed');
  }

  return;
};

// send Verification email
const sendEmailVerificationMail = async (email: string): Promise<void> => {
  const verificationLink = config.verification_url;

  await sendMailerHelper.sendMail(
    email,
    'user Email verification',
    `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
    <h1 style="color: #4CAF50;">Welcome to <span style="color: #4CAF50;">LaundryHub</span></h1>
    <p>Please verify your account by clicking the following link:</p>
    <button style=" padding: 12px 20px; background-color: #4CAF50; color: white; border-radius: 5px; border:none"><a href="${verificationLink}" style="text-decoration: none;color:white; font-weight:bold" >Verify Email</a></button>
   
    <p>Thank you!</p>
  </div>
  `,
  );

  return;
};

// forgot Password
// const forgotPassword = async (email: string) => {
//   const user = await User.findOne({ email: email });

//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
//   }

//   const passResetToken = await jwtHelpers.createResetToken(
//     { id: user.id },
//     config.accessTokenSecret as Secret,
//     '50m',
//   );

//   const resetLink: string = config.resetlink + `token=${passResetToken}`;

//   // console.log('profile: ', profile);
//   await sendEmail(
//     profile.email,
//     `
//       <div>
//         <p>Hi, ${profile.name.firstName}</p>
//         <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
//         <p>Thank you</p>
//       </div>
//   `,
//   );

//   // return {
//   //   message: "Check your email!"
//   // }
// };

export const AuthService = {
  userLogin,
  refreshToken,
  changePassword,
  verification,
  sendEmailVerificationMail,
};
