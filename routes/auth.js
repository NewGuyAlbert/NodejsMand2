const router = require('express').Router();

const nodemailer = require('nodemailer');
const validator = require("email-validator");

const User = require("../models/User.js");
const nodemailerCred = require('../config/nodemailercred.js'); //Don't forget to create this file

const bcrypt = require('bcrypt');
const saltRounds = 12;
 
function sendEmail(email){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: nodemailerCred.email,
          pass: nodemailerCred.password
        }
      });
      
      const mailOptions = {
        from: nodemailerCred.email,
        to: email,
        subject: 'NodejsMandatory2 website account registration',
        text: "Hello \nPlease click the link bellow to confirm your email(after we actually implement that feature)"
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


router.post('/login', (req, res) => {
    const { username, password} = req.body;

    if (username && password){
        try {
            User.query().select('username').where('username', username).then(async foundUser => {
                if (foundUser.length == 0) {
                    return res.redirect("/login?error"); //User not found
                } else{
                    const matchingPassword = await User.query().select('password').where({ 'username': username });
                    const passwordToValidate = matchingPassword[0].password;
                    
                    bcrypt.compare(password, passwordToValidate).then((result) => {
                        if(result){
                            req.session.user = username;
                            return res.redirect("/account");

                        } else{
                            return res.redirect("/login?error"); //Wrong password
                        }
                        
                    });

                }
            });
        }
        catch (error) {
            return res.redirect("/login?error"); //Something wrong with the DB
        }
    }
    else {
        return res.redirect("/login?error"); //Missing fields
    }
});

router.post('/signup', (req, res) => {
    const { username, email, password, passwordRepeat } = req.body;

    const isPasswordTheSame = password === passwordRepeat;

    if (username && password && isPasswordTheSame && email) {
        // password validation
        if (password.length < 8) {
            return res.status(400).send({ response: "Password must be 8 characters or longer" });
        } else if(!validator.validate(email)){
            return res.status(400).send({ response: "Email not valid" });
        }
            else{
                try {
                    User.query().select('username').where('username', username).then(foundUser => {
                        if (foundUser.length > 0) {
                            return res.status(400).send({ response: "User already exists" });
                        } else {
                            bcrypt.hash(password, saltRounds).then(hashedPassword => {
                                User.query().insert({
                                    username,
                                    email,
                                    password: hashedPassword
                                }).then(createdUser => {
                                    sendEmail(email);
                                    req.session.user= username;
                                    return res.redirect('/account');
                                });
                            });
                        }

                    });
                } catch (error) {
                    return res.status(500).send({ response: "Something went wrong with the DB" });
                }
            }
    } else if (password && passwordRepeat && !isPasswordTheSame) {
        return res.status(400).send({ response: "Passwords do not match. Fields: password and passwordRepeat" });
    }
    else {
        return res.status(400).send({ response: "Missing fields: username, password, passwordRepeat" });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {})
    return res.redirect('/signup');
});

module.exports = router;