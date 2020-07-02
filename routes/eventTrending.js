const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship} = require('../models/internship');
const { Volunteering} = require('../models/volunteering');
const { Workshop} = require('../models/workshop');
 
router.get('/', async (req, res) => {
    let internships
    try {
        internships = await Internship.find().limit(5).exec()
    } catch {
        internships = []
    }
})
 
module.exports = router; 