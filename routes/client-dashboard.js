
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Internship } = require('../models/internship');
const { Volunteering } = require('../models/volunteering');
const { Workshop } = require('../models/workshop');
const { User, jwtVerification, isUser } = require('../models/user')
 

router.get('/', async (req, res) => {
    
    let test2 = {
        yes: "hi",
        no: "bad"
    }
    //console.log(isUser(req,res));
    //TODO: ADD JWT VERIF
    let internships = [];
    let volunteerings = [];
    let workshops = [];
    const verif = JSON.parse(jwtVerification(req,res));
    const user = await User.findById(verif._id);
    const eventsCreated = user.eventsCreated;
    for (let i = 0; i < eventsCreated.length; i++) {
        event = eventsCreated[i]
        
        if (event.type == "internship") {
            let test = await Internship.findById(event.id);
            //console.log(test);
            internships.push(await Internship.findById(event.id));
        } 
        else if (event.type == "volunteering") {
            volunteerings.push(await Volunteering.findById(event.id))
        }
        else if (event.type == "workshop") {
            workshops.push(await Workshop.findById(event.id))
        }
    }
    console.log(internships[0].datePosted);
    //console.log(internships[0].eventName)
    res.render("client-dashboard", {events: {internships: internships, volunteerings: volunteerings, workshops: workshops}});
})
 
module.exports = router; 