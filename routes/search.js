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

    var title = req.query.jobTitle
    console.log(title)

    let internships = await Internship.find({"jobTitle": {$regex:title,$options:'i'}})
    console.log(internships)
    let volunteerings =  await Volunteering.find({"eventName": {$regex:title,$options:'i'}})
    console.log(volunteerings)
    let workshops = await Workshop.find({"eventName": {$regex:title,$options:'i'}})
    console.log(workshops)

    internships.forEach(internship => {
        console.log('An internship')
    })
    volunteerings.forEach(volunteerin => {
        console.log('A volunteering')
    })
    workshops.forEach(workshop => {
        console.log('A workshop')
    })
    
    res.render('search')
})
module.exports = router;