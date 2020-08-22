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
    try {
        let userVerification = null
        if (isUser(req,res)) {
            userVerification = isUser(req, res);
        }
        let user = null
        if (userVerification != null){
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

        let adjustedDate = new Date();
        adjustedDate = adjustedDate.getTime() - 25200000;

        let internships = await Internship.find({"datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).sort({"datePosted":-1}).exec()
        let volunteerings = await Volunteering.find({"datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).sort({"datePosted":-1}).exec()
        let workshops = await Workshop.find({"datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).sort({"datePosted":-1}).exec()

        res.render('search', {user: user, results : {user, searchNum, internships : internships, volunteerings : volunteerings, workshops : workshops, internshipIsChecked, volunteeringIsChecked, workshopIsChecked,
                                        opportunityPlaceholder, locationPlaceholder}})
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/query', async (req, res) => {
    try {
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
        
        let adjustedDate = new Date();
        adjustedDate = adjustedDate.getTime() - 25200000;
        
        //1 hour = 3600000 in getTime() 
        let internships = await Internship.find({"jobTitle": {$regex:name,$options:'i'}, "datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).exec()
        let volunteerings =  await Volunteering.find({"eventName": {$regex:name,$options:'i'}, "datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).exec()
        let workshops = await Workshop.find({"eventName": {$regex:name,$options:'i'}, "datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).exec()

        let internshipsLocation = await Internship.find({"jobTitle": {$regex:name,$options:'i'}}).exec()
        let volunteeringsLocation =  await Volunteering.find({"eventName": {$regex:name,$options:'i'}}).exec()
        let workshopsLocation = await Workshop.find({"eventName": {$regex:name,$options:'i'}}).exec()

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
    }
    catch (err) {
        console.log(err)
    }
})
module.exports = router;