const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-url');
let ObjectID = require('mongodb').ObjectID;

const Internship = mongoose.model('Internship', new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255,
        unique: false
    },
    companyName: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 50
    },
    //TODO: add location
    link: {
        type: String,
        required: false
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 2000,
        required: true
    },
    city: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    state: {
        type: String,
        required: false,
        minLength: 1,
        maxLength: 50
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    datePosted: {
        type: Date,
        required: false
    }
    // opportunityType: {
    //     type: String,
    //     required: true
    // }
}));
 
function validateInternship(internship) {
    const schema = {
        jobTitle: Joi.string().min(1).max(128).required(),
        email: Joi.string().min(5).max(255).required().email(),
        companyName: Joi.string().min(1).max(128).required(),
        description: Joi.string().min(1).max(2000).required(),
        city: Joi.string().min(1).max(50).required(),
        state: Joi.string().min(1).max(50).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        datePosted: Joi.date().required(),
        link: Joi.string().uri()
    };
    return Joi.validate(internship, schema);
}
 
exports.Internship = Internship;
exports.validate = validateInternship;
