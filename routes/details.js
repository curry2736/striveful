const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const { Internship }= require('../models/internship');
const {Volunteering} = require('../models/volunteering');
const { Workshop }= require('../models/workshop');
const e = require('express');
let ObjectID = require('mongodb').ObjectID;


router.get('/', (req,res) => {
    res.render('details');
});

//Show details
router.get('/:id', async (req,res) =>{
    try {
        console.log(req.params.id); 
        var result = await Internship.findById(req.params.id);
        if (!result){
            var result = await Volunteering.findById(req.params.id);
            
        } else if (!result){
            var result = await Workshop.findById(req.params.id);
        }; 
        //console.log(result);
        console.log(result)
        res.render('details.ejs', {detail: {result: result}});
    } catch (err){
        console.log(err);
        res.redirect('/');
    }
});

module.exports = router;
