/**
 * Title: 'Manage  nessaray secret'
 * Description: 'handle or manage .env file's secret data'
 * Author: 'Masum Rana'
 * Date: 27-12-2023
 *
 */

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  email: process.env.EMAIL,
  email_password: process.env.EMAIL_PASSWORD,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.SOLT_ROUNDS,
  accessTokenSecret: process.env.JWT_ACCESSTOKEN_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESHTOKEN_SECRET,
  accessTokenExpireIn: process.env.JWT_ACCESSTOKEN_EXPIRE,
  refreshTokenExpireIn: process.env.JWT_REFRESHTOKEN_EXPIRE,
};
