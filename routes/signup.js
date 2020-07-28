const express = require('express');
const router = express.Router();
const { User, isUser} = require('../models/user');

router.get('/', async (req, res) => {
    const id = isUser(req,res);
    const user = await User.findById(id);
    console.log(user)
    res.render('signup', {
        user: user
    });
})
module.exports = router;