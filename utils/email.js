const nodemailer = require('nodemailer');

const sendVerificationEmail = async (user) => {
  try {
    const testaccount=await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.net",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'macie.gusikowski30@ethereal.email',
           pass: '83p1bBKN5SnJ7yKhj3'
        },
      });

    const verificationToken = user.verificationToken;
    const verificationURL = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_SERVICE, // replace with your email address
      to: user.email,
      subject: 'Verify Your Email',
      html: `<p>Click the following link to verify your email: <a href="${verificationURL}">${verificationURL}</a></p>`,
    };


    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send verification email');
  }
};

module.exports = { sendVerificationEmail };
