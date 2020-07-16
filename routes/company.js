const express = require('express');
const router = express.Router();
const { Internship, validate } = require('../models/internship');


router.get('/', (req, res) => {
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
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }
        try {
        
            const newInternship = await internship.save()
            res.redirect('company')
        } catch {
            res.render('company', {
                 internship: internship,
                 errorMessage: error.details[0].message
            })
        }
    
    
    
    
   
    // internship.save((err, newInternship) => {
    //     if (err) {
    //         res.render('company', {
    //             internship: internship,
    //             errorMessage: 'Fool'
    //         })
    //     } else {
    //         res.redirect('meme')
    //     }
    // })
    //res.send(req.body.jobTitle)

})

module.exports = router;
