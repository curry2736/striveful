const { User, validateUser } = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {
    // First Validate The Request
    // const { error } = validateUser(req.body);
    // console.log(req.body);
    
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }
    // Check if this user already exisits
    let lowerEmail = req.body.email
    console.log(lowerEmail)
    lowerEmail = lowerEmail.toString()
    console.log(lowerEmail)
    lowerEmail = lowerEmail.toLowerCase()
    console.log(lowerEmail)
    const d = "ASDASDASDADS"
    console.log(d.toLowerCase())

    console.log(req.body.firstName)
    let user = await User.findOne({ email: req.body.email.toString().toLowerCase() });
    console.log(user)
    if (user) {
        req.flash('error', 'That user already exists!');
        res.redirect('../signup');
    } else {
        // Insert the new user if they do not exist yet
        //user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'isCompany']));
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email.toString().toLowerCase(),
            password: req.body.password,
            isCompany: false
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({ _id: user._id, email: user.email }, config.get('PrivateKey'));
        res.cookie('token', token);
        //res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastname', 'email']));
        res.redirect('/')
    }
});

router.post('/test', async (req, res) => {
    const salt = "$2b$10$iP1fGMTDq47IedcljZgf/.";
    const pass = await bcrypt.hash('howtobeanoob105', salt); 
    res.send(pass + " " + salt);
});
 
module.exports = router;
