require('dotenv').config();
const { user: User } = require('../../models/index');
const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = process.env.SENDGRID_KEY;

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email, username) => {
  sgMail.send({
    to: email,
    from: 'doumaniant@gmail.com',
    subject: 'Welcome to users-and-posts!!!',
    text: `Thank you for joining our application dear ${username}.`,
  });
};

const sendVerificationCode = async (email) => {
  const code = Math.floor(Math.random() * 1000000);
  const user = await User.findOne({ where: { email } });
  user.verificationCode = code;
  user.codeCreatedAt = Date.now();
  await user.save();
  sgMail.send({
    to: email,
    from: 'doumaniant@gmail.com',
    subject: 'Verification code to login',
    text: `Here is your 6 digit verification code: ${code}. Please hurry, your code will expire in 3 minutes!`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendVerificationCode,
};
