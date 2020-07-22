const express = require('express');
const router = express.Router();
const { Internship, validate } = require('../models/internship');
const { Volunteering } = require('../models/volunteering.js');
const { Workshop } = require('../models/workshop');
const { User, jwtVerification } = require('../models/user');


router.get('/', (req, res) => {
    // const didIGetIn = jwtVerification(req, res);
    // console.log(didIGetIn + "metro boomin");
    // const verif = JSON.parse(jwtVerification(req,res));
    // const user = User.findById(verif._id);
    const didIGetIn = jwtVerification(req, res);
    console.log(didIGetIn);
    
    
    
    res.render('company')
    
})

router.post('/', async (req, res) => {
    // First Validate The Request
    // const { error } = validate(req.body);
    // console.log(validate(req.body));
    // console.log(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }
    // if (req.body.opportunity == 'internships') {
    const verif = JSON.parse(jwtVerification(req,res));
    const user = await User.findById(verif._id);
    console.log(user);
    const eventsCreated = user.eventsCreated;
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
        datePosted: req.body.datePosted
    })
    try {
        const newInternship = await internship.save()
        res.redirect('company')
    } catch {
        res.render('company', {
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
        // type: "internship"
    })
    // const volunteeringArr = new Volunteering({
    //     id: .id,
    //     email: req.body.email,
        
    // })
    // console.log(req.body);
    // const { error } = validate(req.body);
    // console.log(error);
    try {
        const newVolunteering = await volunteering.save();
        eventsCreated.push(newVolunteering);
        console.log(user.eventsCreated)
        res.redirect('company')
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
            datePosted: req.body.datePosted
        })
        // console.log(req.body);
        // const { error } = validate(req.body);
        // console.log(error);
        try {
            const newWorkshop = await workshop.save()
            res.redirect('company')
        } catch {
            res.render('company', {
                    workshop: workshop,
                    errorMessage: "error.details[0].message"
                })
            }
        }
    // let internships = [];
    // let volunteerings = [];
    // let workshops = [];
    
    
    // for (let i = 0; i < eventsCreated.length; i++) {
    //     event = eventsCreated[i]
        
    //     if (event.type == "internship") {
    //         let test = await Internship.findById(event.id);
    //         console.log(test);
    //         internships.push(await Internship.findById(event.id));
    //     } 
    //     else if (event.type == "volunteering") {
    //         volunteerings.push(await Volunteering.findById(event.id))
    //     }
    //     else if (event.type == "workshop") {
    //         workshops.push(await Workshop.findById(event.id))
    //     }
    // }
    
    
   
   

})

module.exports = router;
