const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
var ObjectId = require('mongodb').ObjectID;
require('dotenv').config()

const User = mongoose.model('User', new mongoose.Schema({
    isCompany: {
        type: Boolean,
        required: true,
    },
    //set to true if box ticked
    requestingCompany: {
        type: Boolean,
        required: true
    },
    //if requestingCompany box ticked, show school
    school: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    link: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 512
    },
    eventsCreated: {
        type: Array,
        required: false
    },
    favorites: {
        type: Array,
        required: true
    }
}));

function jwtVerification(req, res) {
    let cookies = "";
    if (req.headers.cookie) {
        cookies = req.headers.cookie.split("; ");
    } else {
        return null;
    }
    let authToken = "";
    let buff = "";
    cookies.forEach( cookie => {
        if (cookie.includes("token")) {
            authToken = cookie.split("=")[1];
        }
    });
    if (!authToken) {
        return res.redirect("/signup")
    }
    jwt.verify(authToken, process.env.PRIVATE_KEY , (err) => {
        if (err) {
            console.log(err);
            return res.redirect("/signup")
        }
        buff = new Buffer(authToken.split(".")[1], 'base64')
    });
    return (buff.toString('ascii'));
}

function isUser(req, res) {
    let cookies = req.headers.cookie
    try {
        cookies = cookies.split("; ");
    } catch (err) {
        //console.log(err);
        return null;
    }
    let authToken = null;
    let buff = "";
    cookies.forEach( cookie => {
        if (cookie.includes("token")) {
            authToken = cookie.split("=")[1];
        }
    });
    if (!authToken) {
        return null
    }
    jwt.verify(authToken, process.env.PRIVATE_KEY , (err) => {
        if (err) {
            console.log(err);
            return null
        }
        buff = new Buffer(authToken.split(".")[1], 'base64')
    });
    const token = JSON.parse(buff.toString('ascii'))
    return token._id;
}

function logout(req,res) {
    cookies.set('token', {expires: Date.now()})
}

function validateUser(user) {
    const schema = {
        isCompany: Joi.boolean().required(),
        link: Joi.string().uri(),
        firstName: Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(512).required(),
        favorites: Joi.array(),
        school: Joi.string().min(5).max(255)
    };
    return Joi.validate(user, schema);
}


exports.User = User;
exports.logout = logout;
exports.isUser = isUser;
exports.validateUser = validateUser;
exports.jwtVerification = jwtVerification;