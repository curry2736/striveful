const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const { Internship }= require('../models/internship');
const {Volunteering} = require('../models/volunteering');
const { Workshop }= require('../models/workshop');
const { User, isUser } = require('../models/user');

router.get('/:id', async (req,res)=>{
    try{
        res.render('../views/club')
    }
    catch{

    }
})