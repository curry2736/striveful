const { User, validateUser } = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validateUser(req.body);
    console.log(req.body);
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'isCompany']));
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