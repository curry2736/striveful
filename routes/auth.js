const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    console.log(req.body);
    const { error } = validate(req.body);
    console.log(error);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    console.log(req.body)
    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }
    
    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, config.get('PrivateKey'));
    
    res.cookie('token', token);
    return res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastname', 'email']));
});

/*router.get('/verify', async (req, res) => {
    const cookies = req.headers.cookie.split("; ");
    let authToken = "";
    let buff = "";
    cookies.forEach( cookie => {
        if (cookie.includes("token")) {
            authToken = cookie.split("=")[1];
        }
    });
    jwt.verify(authToken, config.get('PrivateKey') , (err) => {
        console.log(authToken);
        if (err) {
            console.log(err);
            return res.redirect("/signup")
        }
        buff = new Buffer(authToken.split(".")[1], 'base64')
        console.log(buff.toString('ascii'));
    });
    return res.send(buff.toString('ascii'))
});*/
 
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
 
    return Joi.validate(req, schema);
}

module.exports = router; 
