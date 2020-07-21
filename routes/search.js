const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship} = require('../models/internship');
const { Volunteering} = require('../models/volunteering.js');
const { Workshop} = require('../models/workshop');
const { query } = require('express');



router.get('/', async(req, res) => {

    var searchNum = 'All available opportunities'

    let internships = await Internship.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1})
    let volunteerings = await Volunteering.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1})
    let workshops = await Workshop.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1})

    res.render('search', {results : {searchNum, internships : internships, volunteerings : volunteerings, workshops : workshops}})

})

router.get('/query', async (req, res) => {

    var searchNum

    var name = req.query.name.toLowerCase()
    //name = name.replace(/\s+/g, ''); //removes whitespaces
    console.log('query: ' + name)

    let internships = await Internship.find({"jobTitle": {$regex:name,$options:'i'}}).exec()
    //console.log(internships)
    let volunteerings =  await Volunteering.find({"eventName": {$regex:name,$options:'i'}}).exec()
    //console.log(volunteerings)
    let workshops = await Workshop.find({"eventName": {$regex:name,$options:'i'}}).exec()
    //console.log(workshops)
    
    var totalResults = internships.length + volunteerings.length + workshops.length

    if (name == '') {
        searchNum = 'We have found 0 opportunities'
    }
    else if (totalResults == 1) {
        searchNum = 'We have found ' + totalResults +  ' opportunity'
    }
    else {
        searchNum = 'We have found ' + totalResults +  ' opportunities'
    }

    console.log('total results: ' + totalResults)

    if (name != null)
    internships.forEach(internship => {
        console.log(internship.jobTitle)
    })
    volunteerings.forEach(volunteering => {
        console.log(volunteering.eventName)
    })
    workshops.forEach(workshop => {
        console.log(workshop.eventName)
    })

    console.log('--------------------------------------------')
    
    res.render('search', {results: {searchNum : searchNum, internships : internships, volunteerings : volunteerings, workshops : workshops}})

})
module.exports = router;