const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const { User, validate, isUser } = require('../models/user');


router.get('/', async (req,res)=> {
    try{
        const userVerification = isUser(req, res);

        let user = null
    
        if (userVerification != null ){
            user = await User.findOne({ _id: userVerification });
        }
    
        console.log(user)

        res.render('about', {user : user});
    }
    catch (err){
        console.log(err);
    }
});

module.exports = router;