const mongoose = require('mongoose');
require('mongoose-type-url');
let ObjectID = require('mongodb').ObjectID;


const resettoken = mongoose.model('passwordResetToken', new mongoose.Schema({
//_userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
email: {
    type: String,
    required: true,
},
resettoken: { type: String, required: true },
createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
}));


exports.passwordResetToken = resettoken;