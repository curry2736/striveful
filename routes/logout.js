const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship} = require('../models/internship');
const { Volunteering} = require('../models/volunteering.js');
const { Workshop} = require('../models/workshop');

 
router.get('/', async (req, res) => {
    res.clearCookie('token')
    res.redirect('/');
})

module.exports = router; 
