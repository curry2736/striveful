const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship} = require('../models/internship');
const { Volunteering} = require('../models/volunteering.js');
const { Workshop} = require('../models/workshop');
const { User, validate, isUser } = require('../models/user');

 
router.get('/', async (req, res) => {
    let adjustedDate = new Date();
    adjustedDate = adjustedDate.getTime() - 25200000;
    
    let internships = await Internship.find({"datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).sort({"datePosted":-1}).limit(3)

    let volunteerings = await Volunteering.find({"datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).sort({"datePosted":-1}).limit(3)

    let workshops = await Workshop.find({"datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).sort({"datePosted":-1}).limit(3)

    const userVerification = isUser(req,res); 

    let user = null

    if (userVerification != null ){
        user = await User.findOne({ _id: userVerification });
    }

    console.log(user + " at ip address " + req.connection.remoteAddress);

    res.render('index', {user: user, recents : {internships: internships, volunteerings: volunteerings, workshops: workshops}, message: req.flash('error') })
})

module.exports = router; 
