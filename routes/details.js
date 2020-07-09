const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const { Internship }= require('../models/internship');
const {Volunteering} = require('../models/volunteering');
const { Workshop }= require('../models/workshop');
const e = require('express');
//onst jwt = require('jsonwebtoken');
//const config = require('config');
//const Joi = require('joi');
//const bcrypt = require('bcrypt');
//const _ = require('lodash');

router.get('/', (req,res) => {
    res.render('details.ejs');
});

//Show details
router.get('/:id', async (req,res) =>{
    try {
        console.log(req.params.id);
        let internship = await Internship.findOne({ _id:req.params.id}, 'jobTitle').exec(function (err, adventure) {});
        console.log(internship);

        //res.write({});
        //res.end(); 
    } catch (err){
        console.log(err);
        res.redirect('/');
    }
});

module.exports = router;
