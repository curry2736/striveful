const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship} = require('../models/internship');
const { Volunteering} = require('../models/volunteering');
const { Workshop} = require('../models/workshop');

 
router.get('/', async (req, res) => {
    const internships = await Internship.find()
    //const volunteerings = await Volunteering.find()
    //const workshops = await workshops.find()

    console.log(internships)
    //console.log(volunteerings)
    //console.log(workshops)

    res.render('index', {internships: internships} )
})
 
module.exports = router; 
