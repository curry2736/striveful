const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
    isCompany: {
        type: Boolean,
        required: true,
    },
    link: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    lastName: {
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
        maxlength: 512
    }
}));
 
function validateUser(user) {
    const schema = {
        isCompany: Joi.boolean().required(),
        link: Joi.string().uri(),
        firstName: Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(512).required(),
    };
    return Joi.validate(user, schema);
}
 
exports.User = User;
exports.validate = validateUser;