const express = require('express');
const router = express.Router();
const { Internship } = require('../models/internship');


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
    const internship = new Internship({
        jobTitle: req.body.jobTitle,
        description: req.body.description
    })
    internship.save((err, newInternship) => {
        if (err) {
            res.render('company', {
                internship: internship,
                errorMessage: 'Fool'
            })
        } else {
            res.redirect('company')
        }
    })
    //res.send(req.body.jobTitle)

})

module.exports = router;
