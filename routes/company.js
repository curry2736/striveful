const express = require('express');
const router = express.Router();
const { Internship, validate } = require('../models/internship');
const { Volunteering } = require('../models/volunteering.js');
const { Workshop } = require('../models/workshop');
const { User, jwtVerification } = require('../models/user');



router.get('/', (req, res) => {
    const didIGetIn = jwtVerification(req, res);
    console.log(didIGetIn + "metro boomin");
    res.render('company', { internship: new Internship() })
    
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
    // if (collection is internship) {
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
    console.log(req.body);
    const { error } = validate(req.body);
    console.log(error);
    try {
        
        const newInternship = await internship.save()
        res.redirect('company')
    } catch {
        res.render('company', {
                internship: internship,
                errorMessage: error.details[0].message
            })
        }
    
    
    
    
   
   

})

module.exports = router;
