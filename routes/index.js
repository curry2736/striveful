const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship} = require('../models/internship');
const { Volunteering} = require('../models/volunteering.js');
const { Workshop} = require('../models/workshop');

 
router.get('/', async (req, res) => {
    let internships = await Internship.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1}).limit(3)

    let volunteerings = await Volunteering.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1}).limit(3)

    let workshops = await Workshop.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1}).limit(3)

    //console.log(volunteerings)
    //console.log(workshops)

    res.render('index', {recents : {internships: internships, volunteerings: volunteerings, workshops: workshops}})
})
 
module.exports = router; 
