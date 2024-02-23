import nodemailer from 'nodemailer';
import config from '../config';

const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.email_password,
    },
  });

  await transporter.sendMail({
    from: config.email,
    to,
    subject,
    html,
  });
};

export const sendMailerHelper = {
  sendMail,
};
