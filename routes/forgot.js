const express = require('express');
const router = express.Router();
const uuidv1 = require('uuidv1');
const { User, isUser} = require('../models/user');
const { passwordResetToken} = require('../models/resettoken');
var nodemailer = require('nodemailer');
require('dotenv').config();


router.get('/',  (req, res) => {
    
    let currUser = User.findOne({ email: 'rohit.srivats@gmail.com' });
   
    
    res.render('forgot', {
        user: null,
        message: req.flash('error'),
        messageInfo: req.flash('info')
    });
    
})



router.post('/', async(req, res) => {
    let currUser = await User.findOne({ email: req.body.forgotemail });
    if (!currUser) {
        //return res.status(400).send('Incorrect email or password.');
        req.flash('error', 'Email not found');
        res.redirect('forgot')
        
    } 
    else {
        let currToken = await passwordResetToken.findOne({ email: req.body.forgotemail });
    
        if (currToken) {
             await passwordResetToken.deleteOne({email: req.body.forgotemail})

         }
        
        const id = uuidv1();
        
        
        const resettoken = new passwordResetToken({
            email: req.body.forgotemail,
            //_userId: currUser,
            resettoken: id  
        })
        try {
            await resettoken.save()
        }
        catch (err) {
            console.log(err)
            req.flash('error', 'Server Error, Try Again');
            
            res.render('forgot', {
                    user: null,
                    message: req.flash('error'),
                    messageInfo: req.flash(null)
                })
            }



        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
        });
      
      var mailOptions = {
        from: 'strivefulnet@gmail.com',
        to: req.body.forgotemail,
        subject: 'Striveful Password Reset',
        text: `To reset your password, please click on this link: http://localhost:3000/reset/${id}`
      };
      
        //the link url varies by device: localhost, heroku, production environment
        
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } 
        else {
          console.log('Email sent: ' + info.response);
        }
      })
      //console.log(req.body.forgotemail)
      req.flash('info', 'Please check your email for password reset link.')
      res.redirect('forgot')
           
    
    }
})

module.exports = router;
