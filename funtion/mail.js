var nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()

function sendMail(text) {
  var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.FROM,
      pass: process.env.MAILPASSWORD
    }
  };
  var transporter = nodemailer.createTransport(smtpConfig);

  var mailOptions = {
    from: process.env.FROM,
    to: process.env.TO,
    subject: 'Birthday list',
    html: text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    } else {
      return console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMail