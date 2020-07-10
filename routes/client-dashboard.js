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
    let internships = [];
    let volunteerings = [];
    let workshops = [];
    const verif = JSON.parse(jwtVerification(req,res));
    const user = await User.findById(verif._id);
    console.log(user)
    const eventsCreated = user.eventsCreated;
    console.log(eventsCreated)
    for (let i = 0; i < eventsCreated.length; i++) {
        event = eventsCreated[i]
        if (event.type == "workshop") {
            console.log("workshop");
            workshops.push(await Workshop.findById(event.id))
        } else if (event.type == "internship") {
            console.log("internship")
            internships.push(await Internship.findById(event.id))
        } else if (event.type == "volunteering") {
            console.log("volunteering")
            volunteerings.push(await Volunteering.findById(event.id))
        }
    }

    console.log(workshops)
    console.log(internships)
    console.log(volunteerings)
    res.render("client-dashboard");
})
 
module.exports = router; 