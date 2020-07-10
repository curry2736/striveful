const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const { Internship }= require('../models/internship');
const {Volunteering} = require('../models/volunteering');
const { Workshop }= require('../models/workshop');
const e = require('express');
let ObjectID = require('mongodb').ObjectID;


router.get('/', (req,res) => {
    res.render('details.ejs');
});

//Show details
router.get('/:id', async (req,res) =>{
    try {
        console.log(req.params.id); 
        var result = await Internship.findById(new ObjectID(req.params.id)).exec();
        if (!result){
            var result = await Volunteering.findById(new ObjectID(req.params.id)).exec();
            
        } else if (!result){
            var result = await Workshop.findById(new ObjectID(req.params.id)).exec();
        }; 
        //console.log(result);
        res.render('details.ejs', {detail: {result: result}});
    } catch (err){
        console.log(err);
        res.redirect('/');
    }
});

module.exports = router;
