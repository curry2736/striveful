const express = require('express');
const router = express.Router();
const { Internship, validate } = require('../models/internship');


router.get('/', (req, res) => {
    res.render('company')
    
})

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    console.log(validate(req.body));
    console.log(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

})

module.exports = router;