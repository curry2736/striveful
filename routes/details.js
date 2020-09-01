const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const { Internship }= require('../models/internship');
const {Volunteering} = require('../models/volunteering');
const { Workshop }= require('../models/workshop');
const { User, isUser } = require('../models/user');

let ObjectID = require('mongodb').ObjectID;


//Show details
router.get('/:id', async (req,res) =>{
    console.log(req.connection.remoteAddress);
    try {
        //console.log(req.params.id); 
        const id =  isUser(req, res);
        console.log(id)
        if (id == "5f4e8456afa6fd1054e90bba") {
            return res.render("stop spamming yash")
        }
        const user = await User.findById(id);
        let type = "";
        var result = await Internship.findById(req.params.id);
        if (!result){
            var result = await Volunteering.findById(req.params.id).exec();
            type = "Volunteering"
            if (!result){
                var result = await Workshop.findById(req.params.id);
                type = "Workshop"
                Workshop.updateOne({ _id: req.params.id }, {$inc: {visits: 1}}, (err,res) =>{
                    if (err) throw (err);
                });
            } else{
                Volunteering.updateOne({ _id: req.params.id }, {$inc: {visits: 1}}, (err,res) =>{
                    if (err) throw (err);
                });
                
                
            };
        } else {
            type = "Internship"
            Internship.updateOne({ _id: req.params.id }, {$inc: {visits: 1}}, (err,res) =>{
                if (err) throw (err);
            });
        };
        
        //console.log(result);

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
        
        res.render('details.ejs', {type: type, user: user, details: {result: result, name: name, org: org, dates: dates, type: type}});
    } catch (err){
        res.redirect('/');
    }
});

module.exports = router;
