const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();


router.get('/', (req,res)=> {
    try{
        res.render('about');
    }catch (err){
        console.log(err);
    }
});

module.exports = router;