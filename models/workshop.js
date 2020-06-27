const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-url');

const Workshop = mongoose.model('Workshop', new mongoose.Schema({
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
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2000
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    link: {
        type: String,
        required: false
    }
}));
 
function validateWorkshop(internship) {
    const schema = {
        eventName: Joi.string().min(1).max(50).required(),
        organization: Joi.string().min(1).max(128).required(),
        email: Joi.string().min(5).max(255).required().email(),
        link: Joi.string().uri().required(),
        description: Joi.string().min(1).max(2000).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required()
    };
    return Joi.validate(internship, schema);
}
 
exports.Workshop = Workshop;
exports.Workshop = validateWorkshop;