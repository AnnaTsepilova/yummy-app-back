const nodemailer = require('nodemailer');
require('dotenv').config()


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async mailOptions => await transporter.sendMail(mailOptions);

module.exports = sendEmail;
