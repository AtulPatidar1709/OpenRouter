import { config } from '../../config/config.js';
import nodemailer from 'nodemailer';
import { getVerificationEmailTemplate } from "./nodeMailerTemplate.js";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailAddressKey,
    pass: config.mailSecretKey,
  },
});

export async function sendEmail(email: string, otp: string,) {
  const htmlTemplate = await getVerificationEmailTemplate(email, otp);

  const info = await transporter.sendMail({
    from: `"Entry Ecommerce App" <${config.mailAddressKey}>`,
    to: `${email}`,
    subject: 'Gmail Verification Code',
    text: '',
    html: htmlTemplate,
  });

  return info;
}
