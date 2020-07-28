const express = require('express');
const router = express.Router();
const { Internship, validate } = require('../models/internship');
const { Volunteering } = require('../models/volunteering.js');
const { Workshop } = require('../models/workshop');
const { User, jwtVerification } = require('../models/user');


router.get('/', async(req, res) => {
    // const didIGetIn = jwtVerification(req, res);
    // console.log(didIGetIn + "metro boomin");
    const verif = await JSON.parse(jwtVerification(req,res));
    const user = await User.findById(verif._id);
    //console.log(user.isCompany)
    // const didIGetIn = jwtVerification(req, res);
    // console.log(didIGetIn);
    if (user.isCompany) {
        res.render('company', {
            user: user
        })
        
    }
    else{
        res.redirect("/")
    }
    
    
    
})

router.post('/', async (req, res) => {
   
    // First Validate The Request
    // const { error } = validate(req.body);
    // console.log(validate(req.body));
    // console.log(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }
    


    const verif = await JSON.parse(jwtVerification(req,res));
    const user = await User.findById(verif._id);
    //console.log(user);
    // const eventsCreated = user.eventsCreated;
    if (req.body.category == "Internship") {
    const internship = new Internship({
        jobTitle: req.body.jobTitle,
        email: req.body.email,
        companyName: req.body.companyName,
        link: req.body.link,
        description: req.body.description,
        city: req.body.city,
        state: req.body.state,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        datePosted: req.body.datePosted,
        dateExpiring: req.body.dateExpiring
    })
    try {
        const newInternship = await internship.save()
        console.log(newInternship._id)
        var event = {
            id: newInternship._id.toString(),
            type: "internship"
          };
          user.eventsCreated.push(event)
          await user.save()
        res.render('company', {
            user: user
        })
    } catch (err) {
        console.log(err)
        res.render('company', {
                user: user,
                internship: internship,
                errorMessage: "error.details[0].message"
            })
        }
    }
    else if (req.body.category == "Volunteering"){
    const volunteering = new Volunteering({
        eventName: req.body.jobTitle,
        email: req.body.email,
        organization: req.body.companyName,
        link: req.body.link,
        description: req.body.description,
        city: req.body.city,
        state: req.body.state,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        datePosted: req.body.datePosted,
        dateExpiring: req.body.dateExpiring
        
    })
    // console.log(req.body);
    // const { error } = validate(req.body);
    // console.log(error);
    try {
        const newVolunteering = await volunteering.save();
        var event = {
            id: newVolunteering._id.toString(),
            type: "volunteering"
          };
          user.eventsCreated.push(event)
          await user.save()
          res.render('company', {
            user: user
        })
    } catch {
        res.render('company', {
                volunteering: volunteering,
                errorMessage: "error.details[0].message"
            })
        }
    }
    else if (req.body.category == "Workshop"){
        const workshop = new Workshop({
            eventName: req.body.jobTitle,
            email: req.body.email,
            organization: req.body.companyName,
            link: req.body.link,
            description: req.body.description,
            city: req.body.city,
            state: req.body.state,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            datePosted: req.body.datePosted,
            dateExpiring: req.body.dateExpiring
        })
        // console.log(req.body);
        // const { error } = validate(req.body);
        // console.log(error);
        try {
            const newWorkshop = await workshop.save()
            var event = {
                id: newWorkshop._id.toString(),
                type: "workshop"
              };
              user.eventsCreated.push(event)
              await user.save()
              res.render('company', {
                user: user
            })
        } catch {
            res.render('company', {
                    workshop: workshop,
                    errorMessage: "error.details[0].message"
                })
            }
        }
    
    
    
   
   

})

module.exports = router;


//dont worry about error.details for now
