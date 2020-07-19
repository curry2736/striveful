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
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: false
    },
    companyName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    //TODO: add location
    link: {
        type: String,
        required: true
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
        required: true,
        minLength: 1,
        maxLength: 50
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    datePosted: {
        type: Date,
        required: true
    },
    visits: {
        type: Number
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
        link: Joi.string().uri(),
        visits: Joi.number()
    };
    return Joi.validate(internship, schema);
}
 
exports.Internship = Internship;
exports.validate = validateInternship;
