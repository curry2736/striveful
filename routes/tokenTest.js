const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send("hi");
});
 
 
module.exports = router; 