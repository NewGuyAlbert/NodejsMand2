const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nodemailerNodeMand@gmail.com',
    pass: 'y0hD1tNl7WjDa3wjUUsH' // naturally, replace both with your real credentials or an application-specific password
  }
});

const mailOptions = {
  from: 'nodemailerNodeMand@gmail.com',
  to: 'albe9220@stud.kea.dk ',
  subject: 'Nodemailer Test Email',
  text: "Hello, this is a scam email, pls sent money"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});