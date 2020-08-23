const express = require('express');
const router = express.Router();
const uuidv1 = require('uuidv1');
const { User, isUser} = require('../models/user');
const { passwordResetToken} = require('../models/resettoken');
var nodemailer = require('nodemailer');
require('dotenv').config();
const bcrypt = require('bcrypt');
var tokenid;

router.get('/:id',  async(req, res) => {
    //console.log(req.params.id)
    tokenid = req.params.id
    let resettoken = await passwordResetToken.findOne({ resettoken: req.params.id });
    if (!resettoken) {
        //return res.status(400).send('Incorrect email or password.');
        req.flash('error', 'Invalid Link, Send reset request again');
        res.render('forgot', {
            user: null,
            message: req.flash('error')
        })
        //res.locals.message = req.flash();
    }
    else {
        res.render('reset', {
            user: null,
            message: req.flash('error')
        });
    }

})



router.post('/', async(req, res) => {
    let currToken = await passwordResetToken.findOne({ email: req.body.email });
    console.log("a = " + tokenid)
    if (!currToken) {
        //return res.status(400).send('Incorrect email or password.');
        req.flash('error', 'Email not found');
        res.redirect('reset/' + tokenid) 
        // {
        //     user: null,
        //     //id: tokenid,
        //     message: req.flash('error')
        // })
        //res.locals.message = req.flash();
    }
    else {
        //user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'isCompany']));
        let currUser = await User.findOne({ email: req.body.email });
        const salt = await bcrypt.genSalt(10);
        currUser.password = await bcrypt.hash(req.body.password, salt);
        await currUser.save();
        
        await passwordResetToken.deleteOne({email: req.body.email})

        res.redirect('/')

    }


})



//verify if id exists in db,      get userid based on email entered
//if exists render page



module.exports = router;