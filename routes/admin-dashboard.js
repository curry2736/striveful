
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship } = require('../models/internship');
const { Volunteering } = require('../models/volunteering');
const { Workshop } = require('../models/workshop');
const { User, jwtVerification, isUser } = require('../models/user');
const { isError } = require('lodash');
 

router.get('/', async (req, res) => {
    
    let internships = [];
    let volunteerings = [];
    let workshops = [];
    let verif = jwtVerification(req,res);
    let user = "";
    
    try {
        if (!verif) {
            return res.redirect('/')
        }
        
        verif = JSON.parse(verif)
        user = await User.findById(verif._id);
        console.log(verif)
    } catch (err) {
        console.log(err)
        return res.redirect('/')
    }

    console.log(user.school)
    let pendingUsers = await User.find({school: user.school, requestingCompany: true}).exec()
    let allowedUsers = await User.find({school: user.school, isCompany: true})
    return res.render("admin-dashboard", {user: user, pendingUsers: pendingUsers, allowedUsers: allowedUsers});

})

router.put('/approve/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        user.isCompany = true;
        user.requestingCompany = false;
        user.save()
        return res.redirect('/admin-dashboard')
    } catch (err) {
        console.log(err)
    }
})
router.put('/disapprove/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        user.isCompany = false;
        user.requestingCompany = false;
        user.save()
        return res.redirect('/admin-dashboard')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router; 