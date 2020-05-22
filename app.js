const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static("public"));

const session = require('express-session');


// You need to copy the config.template.json file and fill out your own secret
const config = require('./config/config.json');

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}));


const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 8 // limit each IP to 8 requests per windowMs
});

app.use(express.urlencoded({ extended: false }))
app.use('/signup', authLimiter);
app.use('/login', authLimiter);


/* Setup Knex with Objection */

const { Model } = require('objection');
const Knex = require('knex');
const knexfile = require('./knexfile.js');

const knex = Knex(knexfile.development);

Model.knex(knex);

/* Setup the routes with app */
/* app.use((req, res, next) => {
    console.log("Time of request: ", new Date());
    next();
}); */

const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');

app.use(authRoute);
app.use(usersRoute);


const fs = require('fs');
const navbar = fs.readFileSync("./public/navbar.html", "utf8");
const footer = fs.readFileSync("./public/footer.html", "utf8");
const index = fs.readFileSync("./public/mainpage.html", "utf8");
const signup = fs.readFileSync("./public/signup/signup.html", "utf8");

app.get("/", (req, res) => {
    return res.send(navbar + index + footer);
});

app.get("/signup", (req, res) => {
    return res.send(navbar + signup + footer);
});


const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on the port", PORT);
})