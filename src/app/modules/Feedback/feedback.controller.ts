// const userLogin = catchAsync(async (req: Request, res: Response) => {
//   const { ...loginData } = req.body;
//   const result = await AuthService.userLogin(loginData);
//   const { refreshToken, accessToken, isEmailVerified } = result;
//   const responseData = { accessToken, isEmailVerified };
//   // set refresh token into cookie
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   sendResponse<ILoginUserResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User logged in successfully !',
//     data: responseData,
//   });
// });
