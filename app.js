require("dotenv").config(); // Load enviorment config 
require("./config/database"); // Database load

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require('connect-flash');
const port = 3000 || process.env.PORT;

// Flash Message Initilize
app.use(flash());

// Session Initilize
app.use(session({
    secret: 'j4fDEmVaCXnhJbah',
    resave: false,
    saveUninitialized: true
}));

// Dynamic Helpers for passing session in pug template
app.use( (req, res, next) => {   
    res.locals.session = req.session;
    res.locals.flash_success_msg = req.flash('success');
    res.locals.flash_error_msg = req.flash('error');
    next();
});

// Routers
var isLogined = require("./middleware/isLogined");
var authRoutes = require("./routes/auth");
var dashboard = require("./routes/dashboard");

// Middleware
app.set('view engine', 'pug');
app.set('view options', { layout: 'layout' });

app.use(bodyParser.urlencoded({ extended: false })); // for browser purpose we use it parse body data into JSON
app.use(bodyParser.json()); // Parse body data into JSON
app.use(cors());

app.use("/", authRoutes, isLogined, dashboard);

app.listen(port, () => {    
    console.log(`Project Running on port ${port}`);
});
