const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');

const viewRegister = (req, res) => {   
    res.render("register");
}

const addUser = (req, res) => {    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {        
        res.render("register", { errors : errors.array()});        
    } else {
        bcrypt.hash(req.body.password, 10, (err, hashpass) => {
            if (err) {
                res.render("register", {msg : err});            
            }

            let user = new User({
                name : req.body.name,
                email : req.body.email,
                password : hashpass
            });

            user.save().then(user => {
                res.render("register", {msg : 'Admin User Successfully added.'});            
            }).catch(err => {
                res.render("register", {msg : 'Unable to create User.'});            
            });
        });
    }
}

const viewLogin = (req, res) => {
    res.render("login");
}

const login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;    
    User.findOne( { email } ).then( user => {        
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.render("login", {msg : err});
                }

                if (result) {
                    let token_id = jwt.sign({name : user.name}, process.env.SECRET, {expiresIn : '24h'});
                    req.session.token = token_id;                    
                    res.redirect("dashboard");
                } else {
                    res.render("login", {msg : "Password does not match in our record. kindly please use another password."});
                }
            });
        } else {
            console.log("aa");
            res.render("login", {msg : "User does not exist in our record. kindly please use another user."});
        }
    });    
}

module.exports = {
    viewRegister,
    addUser,
    viewLogin,
    login    
}
