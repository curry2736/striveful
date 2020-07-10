const { User, validate, jwtVerification } = require('../models/user');
const config = require('config');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const userVerification = JSON.parse(jwtVerification(req, res));

    let user = await User.findOne({ _id: userVerification["_id"] });
    user["favorites"].push(req.body["_id"]) //TEMP
    newFavorites = user["favorites"]

    User.updateOne({ _id: userVerification["_id"]}, {$set: {favorites: newFavorites}}, (err, res) => {
        if (err) throw err;
        console.log("Updating user with ID " + userVerification["_id"] + " to add favorite with ID " + req.body["_id"])
    });

    res.end()
});

module.exports = router;