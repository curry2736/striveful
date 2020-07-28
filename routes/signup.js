const express = require('express');
const router = express.Router();
const { User, isUser} = require('../models/user');

router.get('/', (req, res) => {
    const user = isUser(req,res);
    res.render('signup', {
        user: user
    });
})
module.exports = router;