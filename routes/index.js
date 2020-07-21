const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship} = require('../models/internship');
const { Volunteering} = require('../models/volunteering.js');
const { Workshop} = require('../models/workshop');
const { User, validate, isUser } = require('../models/user');

 
router.get('/', async (req, res) => {
    let internships = await Internship.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1}).limit(3)

    let volunteerings = await Volunteering.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1}).limit(3)

    let workshops = await Workshop.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1}).limit(3)

    const userVerification = isUser(req, res);

    let user = null

    if (userVerification != null ){
        user = await User.findOne({ _id: userVerification });
    }

    console.log(user)

    res.render('index', {recents : {internships: internships, volunteerings: volunteerings, workshops: workshops, user: user}})
})

module.exports = router; 
