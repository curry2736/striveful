const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const { Internship }= require('../models/internship');
const {Volunteering} = require('../models/volunteering');
const { Workshop }= require('../models/workshop');
const e = require('express');
let ObjectID = require('mongodb').ObjectID;


//Show details
router.get('/:id', async (req,res) =>{
    try {
        console.log(req.params.id); 
        
        var result = await Internship.findById(req.params.id);
        if (!result){
            var result = await Volunteering.findById(req.params.id).exec();
            if (!result){
                var result = await Workshop.findById(req.params.id);
                Workshop.updateOne({ _id: req.params.id }, {$inc: {visits: 1}}, (err,res) =>{
                    if (err) throw (err);
                });
            } else{
                Volunteering.updateOne({ _id: req.params.id }, {$inc: {visits: 1}}, (err,res) =>{
                    if (err) throw (err);
                });
            };
        } else {
            Internship.updateOne({ _id: req.params.id }, {$inc: {visits: 1}}, (err,res) =>{
                if (err) throw (err);
            });
        };
        
        console.log(result);

        if (!result.jobTitle){
            var name = result.eventName;
        } else if (!result.eventName){
            var name = result.jobTitle;
        };

        if (!result.companyName){
            var org = result.organization;
        } else if (!result.organization){
            var org = result.companyName;
        };

        let dates = {
            datePosted: result.datePosted.toLocaleDateString('en-US'),
            startDate: result.startDate.toLocaleDateString('en-US'),
            endDate: result.endDate.toLocaleDateString('en-US')
        };
        
        res.render('details.ejs', {details: {result: result, name: name, org: org, dates: dates}});
    } catch (err){
        console.log(err);
        res.redirect('/');
    }
});

module.exports = router;
