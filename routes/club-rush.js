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

        var searchNum = 'All available clubs'
        var totalResults = null

        var opportunityPlaceholder = ''
        console.log(opportunityPlaceholder)
        var locationPlaceholder = ''
        console.log(locationPlaceholder)
        
        var checkedName = true
        var checkedTitle = false

        let adjustedDate = new Date();
        adjustedDate = adjustedDate.getTime() - 25200000;

        let volunteerings = await Volunteering.find({"datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).sort({"datePosted":1}).exec()

        res.render('club-rush', {user: user, results : {user, searchNum, volunteerings : volunteerings,
                                        opportunityPlaceholder : opportunityPlaceholder, locationPlaceholder, checkedName : checkedName, checkedTitle : checkedTitle}})
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
        //console.log(user)

        var searchNum = null
        var totalResults = 0
        var checkedName = false
        var checkedTitle = false
        var volunteerings = ''

        var name = req.query.name.toLowerCase()
        console.log('query: ' + name)
        var opportunityPlaceholder = req.query.name
        console.log(opportunityPlaceholder)
        //var locationPlaceholder = req.query.location
        //console.log(locationPlaceholder)
        var searchByName = req.query.hSearchName
        console.log('name: ' + searchByName)
        var searchByMemberTitle = req.query.hSearchTitle
        console.log('title: ' + searchByMemberTitle)

        let adjustedDate = new Date();
        adjustedDate = adjustedDate.getTime() - 25200000;

        if (searchByName == "on") {
            checkedName = true
            volunteerings =  await Volunteering.find({"organization": {$regex:name,$options:'i'}, "datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).exec()
        }
        else if (searchByMemberTitle == "on") {
            checkedTitle = true
            volunteerings =  await Volunteering.find({"eventName": {$regex:name,$options:'i'}, "datePosted":{$lte: adjustedDate}, "dateExpiring":{$gte: adjustedDate}}).exec()
        }
        
        totalResults = volunteerings.length;

        console.log('total results: ' + totalResults)

        if (totalResults == 1) {
            searchNum = totalResults +  ' result for "' + name + '"'
        }
        else {
            searchNum = totalResults +  ' results for "' + name + '"'
        }

        console.log('--------------------------------------------------------------------')
        res.render('club-rush', {results : {user, searchNum, volunteerings : volunteerings,
                                        opportunityPlaceholder : opportunityPlaceholder, checkedName : checkedName, checkedTitle : checkedTitle}})
    }
    catch (err) {
        console.log(err)
    }
})
module.exports = router;