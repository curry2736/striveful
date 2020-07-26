const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship} = require('../models/internship');
const { Volunteering} = require('../models/volunteering.js');
const { Workshop} = require('../models/workshop');
const { query } = require('express');
const { on } = require('nodemon');
const { User, validate, isUser } = require('../models/user');


router.get('/', async(req, res) => {

    const userVerification = isUser(req, res);
    let user = null
    if (userVerification != null ){
        user = await User.findOne({ _id: userVerification });
    }
    console.log(user)

    var searchNum = 'All available opportunities'
    var totalResults = null
    var internshipIsChecked = true
    var volunteeringIsChecked = true
    var workshopIsChecked = true

    var opportunityPlaceholder = ''
    console.log(opportunityPlaceholder)
    var locationPlaceholder = ''
    console.log(locationPlaceholder)

    let internships = await Internship.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1}).exec()
    let volunteerings = await Volunteering.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1}).exec()
    let workshops = await Workshop.find({"datePosted":{$lte: Date.now()}}).sort({"datePosted":-1}).exec()

    res.render('search', {results : {user, searchNum, internships : internships, volunteerings : volunteerings, workshops : workshops, internshipIsChecked, volunteeringIsChecked, workshopIsChecked,
                                    opportunityPlaceholder, locationPlaceholder}})

})

router.get('/query', async (req, res) => {

    const userVerification = isUser(req, res);
    let user = null
    if (userVerification != null ){
        user = await User.findOne({ _id: userVerification });
    }
    console.log(user)

    var searchNum = null
    var totalResults = 0

    var name = req.query.name.toLowerCase()
    console.log('query: ' + name)
    var opportunityPlaceholder = req.query.name
    console.log(opportunityPlaceholder)
    var locationPlaceholder = req.query.location
    console.log(locationPlaceholder)

    var internshipIsChecked = req.query.internshipCheck
    console.log('internship: ' + internshipIsChecked)
    var volunteeringIsChecked = req.query.volunteeringCheck
    console.log('volunteering: ' + volunteeringIsChecked)
    var workshopIsChecked = req.query.workshopCheck
    console.log('workshop: ' + workshopIsChecked)

    let internships = await Internship.find({"jobTitle": {$regex:name,$options:'i'}}).exec()
    let volunteerings =  await Volunteering.find({"eventName": {$regex:name,$options:'i'}}).exec()
    let workshops = await Workshop.find({"eventName": {$regex:name,$options:'i'}}).exec()
    
    if (internshipIsChecked) {
        totalResults += internships.length
        internships.forEach(internship => {
            console.log(internship.jobTitle)
        })
    }
    if (volunteeringIsChecked) {
        totalResults += volunteerings.length
        volunteerings.forEach(volunteering => {
            console.log(volunteering.eventName)
        })
    }
    if (workshopIsChecked) {
        totalResults += workshops.length
        workshops.forEach(workshop => {
            console.log(workshop.eventName)
        })
    }
    console.log('total results: ' + totalResults)

    if (totalResults == 1) {
        searchNum = totalResults +  ' result for "' + name + '"'
    }
    else {
        searchNum = totalResults +  ' results for "' + name + '"'
    }

    console.log('--------------------------------------------------------------------')
    
    res.render('search', {results : {user, searchNum, internships : internships, volunteerings : volunteerings, workshops : workshops, internshipIsChecked, volunteeringIsChecked, workshopIsChecked,
                                    opportunityPlaceholder, locationPlaceholder}})

})
module.exports = router;