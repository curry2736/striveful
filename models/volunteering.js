const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-url');
let ObjectID = require('mongodb').ObjectID;

const Volunteering = mongoose.model('Volunteering', new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 128
    },
    organization: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 128,
        //unique: true
    },
    school: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2000
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
    city: {
        type: String,
        required: false,
        minLength: 1,
        maxLength: 50
    },
    state: {
        type: String,
        required: false,
        minLength: 1,
        maxLength: 50
    },
    websiteLink: {
        type: String,
        required: false
    },
    formLink: {
        type: String,
        required: false
    },
    dateExpiring: {
        type: Date,
        required: true
    },
    visits: {
        type: Number
    },
    teamsLink: {
        type: String,
        required: true
    },
    youtubeLink: {
        type: String,
        required: false
    },
    presidentEmail: {
        type: String,
        required: true
    },
    advisorEmail: {
        type: String,
        required: true
    }
}));
 
function validateVolunteering(volunteering) {
    const schema = {
        eventName: Joi.string().min(1).max(128).required(),
        email: Joi.string().min(5).max(255).required().email(),
        organization: Joi.string().min(1).max(128).required(),
        school: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(1).max(2000).required(),
        city: Joi.string().min(1).max(50).required(),
        state: Joi.string().min(1).max(50).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        datePosted: Joi.date().required(),
        websiteLink: Joi.string().uri(),
        formLink: Joi.string().uri().required(),
        visits: Joi.number(),
        teamsLink: Joi.string().uri().required(),
        youtubeLink: Joi.string().uri().required(),
        presidentEmail: Joi.string().uri().required(),
        advisorEmail: Joi.string().uri().required()
    };
    return Joi.validate(volunteering, schema);
}
 
exports.Volunteering = Volunteering;
exports.validateVolunteering = validateVolunteering;