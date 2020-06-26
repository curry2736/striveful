const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-url');

const Internship = mongoose.model('Internship', new mongoose.Schema({
    name: {
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
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
}));
 
function validateInternship(internship) {
    const schema = {
        isCompany: Joi.boolean().required(),
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(internship, schema);
}
 
exports.Internship = Internship;
exports.validate = validateInternship;