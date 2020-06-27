const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-url');

const Internship = mongoose.model('Internship', new mongoose.Schema({
    eventName: {
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
        unique: true
    },
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
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
}));
 
function validateInternship(internship) {
    const schema = {
        eventName: Joi.string().min(1).max(128).required(),
        email: Joi.string().min(5).max(255).required().email(),
        organization: Joi.string().min(1).max(128).required(),
        description: Joi.string().min(1).max(2000).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        link: Joi.string().uri()
    };
    return Joi.validate(internship, schema);
}
 
exports.Internship = Internship;
exports.validate = validateInternship;