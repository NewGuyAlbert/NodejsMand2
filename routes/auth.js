const router = require('express').Router();

const User = require("../models/User.js");

const bcrypt = require('bcrypt');
const saltRounds = 12;


router.post('/login', (req, res) => {
    // 1. Get the data from the request
    // 2. Validate the data 
    // 3. Check if user exists and get their password
    // 4. Bcrypt compare
    // 5. Send a response based on the comparison

/*     bcrypt.compare("password", "$2b$12$ivRBaGRMAc5VSV68QVkBsel8Im6xv6ybGZU55QTRNN8W3ufmPG8da")
    .then(result => console.log(result)); */
    return res.status(501).send({ response: "Not implemented yet" });
});

router.post('/signup', (req, res) => {
    const { username, password, passwordRepeat } = req.body;

    const isPasswordTheSame = password === passwordRepeat;

    if (username && password && isPasswordTheSame) {
        // password validation
        if (password.length < 8) {
            return res.status(400).send({ response: "Password must be 8 characters or longer" });
        } else {
            try {
                User.query().select('username').where('username', username).then(foundUser => {
                    if (foundUser.length > 0) {
                        return res.status(400).send({ response: "User already exists" });
                    } else {
                        bcrypt.hash(password, saltRounds).then(hashedPassword => {
                            User.query().insert({
                                username,
                                password: hashedPassword
                            }).then(createdUser => {
                                return res.send({ response: `The user ${createdUser.username} was created` });
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
    return res.status(501).send({ response: "Not implemented yet" });
});

module.exports = router;