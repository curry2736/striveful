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

    console.log(req.body.firstName)
    let user = await User.findOne({ email: req.body.email.toString().toLowerCase() });
    console.log(user)
    /*for mohit: if requestingCompany checkbox is ticked(you have to make this), then show dropdown that says smth like "what school are you part of" and select school
    also remember to add an option for "im not part of a school club". in this case let them signup normally but then show popup to contact us for event creation permission. ask rohit to do this if need help
    if ticked make field true, also pass school field to new user
    if not ticked then create user object without those
    */
    if (user) {
        req.flash('error', 'That user already exists!');
        res.redirect('../signup');
    } else if(req.body.requestingCompany == "true"){
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email.toString().toLowerCase(),
            password: req.body.password,
            isCompany: false,
            isAdmin: false,
            requestingCompany: true,
            school: req.body.school
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({ _id: user._id, email: user.email }, config.get('PrivateKey'));
        res.cookie('token', token);
        //res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastname', 'email']));
        res.redirect('/')
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email.toString().toLowerCase(),
            password: req.body.password,
            isCompany: false,
            isAdmin: false,
            requestingCompany: false
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
