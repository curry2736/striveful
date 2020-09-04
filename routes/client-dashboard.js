
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
    let verif = jwtVerification(req,res);
    try {

        
        if (!verif) {
            return res.redirect('/')
        }
        verif = JSON.parse(verif)
        console.log(verif)
    } catch (err) {
        console.log(err)
        return res.redirect('/')
    }
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
    //console.log(internships[0].eventName)
    res.render("client-dashboard", {user: user, events: {internships: internships, volunteerings: volunteerings, workshops: workshops}});
})

router.delete('/internships/:id', async (req, res) => {
    await Internship.deleteOne({"_id": req.params.id})
    await User.update(
        {'_id': req.body.userId}, 
        { $pull: { "eventsCreated" : { id: req.params.id } } }, (err, data) => {
            if(err) {
                return res.status(500).json({'error' : 'error in deleting address'});
            }
            console.log(data)
        },
    );
    console.log(req.body)
    res.redirect("/client-dashboard")
})

router.delete('/workshops/:id', async (req, res) => {
    await Workshop.deleteOne({"_id": req.params.id})
    await User.update(
        {'_id': req.body.userId}, 
        { $pull: { "eventsCreated" : { id: req.params.id } } }, (err, data) => {
            if(err) {
                return res.status(500).json({'error' : 'error in deleting address'});
            }
            console.log(data)
        },
    );
    console.log(req.body)
    res.redirect("/client-dashboard")
})

router.delete('/volunteerings/:id', async (req, res) => {
    await Volunteering.deleteOne({"_id": req.params.id})
    await User.update(
        {'_id': req.body.userId}, 
        { $pull: { "eventsCreated" : { id: req.params.id } } }, (err, data) => {
            if(err) {
                return res.status(500).json({'error' : 'error in deleting address'});
            }
            console.log(data)
        },
    );
    console.log(req.body)
    res.redirect("/client-dashboard")
})
 
module.exports = router; 