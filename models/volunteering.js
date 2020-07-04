const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-url');

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
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
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
    link: {
        type: String,
        required: false
    }
}));
 
function validateVolunteering(volunteering) {
    const schema = {
        eventName: Joi.string().min(1).max(128).required(),
        email: Joi.string().min(5).max(255).required().email(),
        organization: Joi.string().min(1).max(128).required(),
        description: Joi.string().min(1).max(2000).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        datePosted: Joi.date().required(),
        link: Joi.string().uri()
    };
    return Joi.validate(volunteering, schema);
}
 
exports.Volunteering = Volunteering;
exports.validate = validateVolunteering;