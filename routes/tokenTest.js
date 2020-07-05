const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { jwtVerification } = require('../models/user');
router.get('/', async (req, res) => {
    const didIGetIn = jwtVerification(req, res);
    console.log(didIGetIn);
    res.send("hi");
});
 
 
module.exports = router; 