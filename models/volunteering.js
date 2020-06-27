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
    link: {
        type: String,
        required: false
    }
}));
 
function validateVolunteering(internship) {
    const schema = {
        eventName: Joi.string().min(1).max(128).required(),
        organization: Joi.string().min(1).max(128).required(),
        description: Joi.string().min(1).max(2000).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        link: Joi.string().uri()
    };
    return Joi.validate(internship, schema);
}
 
exports.volunteering = Volunteering;
exports.validate = validateVolunteering;