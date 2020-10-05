const express = require("express");
const router = express.Router();
const { viewRegister, addUser, viewLogin, login } = require("../controllers/auth");
const { body } = require('express-validator');
const { validate } = require("../validations/auth");

// check user is already login or not
const logined = (req, res, next) => {
    let token = req.session.token;
    console.log(token);

    if (token) {
        res.redirect("dashboard");
    } 

    next();
}

// Register Routes
router.get("/register", logined, viewRegister);
router.post("/addUser", logined, validate, addUser);

// Login Routes
router.get("/", logined, viewLogin);
router.post("/checkAuth", logined, login);

// logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;