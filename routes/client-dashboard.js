const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship } = require('../models/internship');
const { Volunteering } = require('../models/volunteering');
const { Workshop } = require('../models/workshop');
const { User, jwtVerification } = require('../models/user')
 
router.get('/', async (req, res) => {
    //TODO: ADD JWT VERIF
    const verif = JSON.parse(jwtVerification(req,res));
    console.log(verif);
    res.render("client-dashboard");
})
 
module.exports = router; 