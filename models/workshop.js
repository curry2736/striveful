const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-url');
let ObjectID = require('mongodb').ObjectID;

const Workshop = mongoose.model('Workshop', new mongoose.Schema({
    _id: {
        type: ObjectID,
        required: true,
        unique: true
    },
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
    link: {
        type: String,
        required: false
    }
}));
 
function validateWorkshop(workshop) {
    const schema = {
        eventName: Joi.string().min(1).max(50).required(),
        organization: Joi.string().min(1).max(128).required(),
        email: Joi.string().min(5).max(255).required().email(),
        link: Joi.string().uri().required(),
        description: Joi.string().min(1).max(2000).required(),
        city: Joi.string().min(1).max(50).required(),
        state: Joi.string().min(1).max(50).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        datePosted: Joi.date().required()
    };
    return Joi.validate(workshop, schema);
}
 
exports.Workshop = Workshop;
exports.validate = validateWorkshop;