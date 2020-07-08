const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship} = require('../models/internship');
const { Volunteering} = require('../models/volunteering.js');
const { Workshop} = require('../models/workshop');

router.get('/', async(req, res) => {
    res.render('search')
})

router.get('/query', async (req, res) => {

    var title = req.query.jobTitle;
    console.log(req.query)
    let internships = await Internship.find({"jobTitle": title})
    console.log(internships)
    
    internships.forEach(internship => {
        console.log('Hello')
    })
    res.send("hi");
    //res.render('search')
})

module.exports = router;