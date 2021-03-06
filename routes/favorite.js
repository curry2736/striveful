const { User, validate, jwtVerification } = require('../models/user');
const { Internship} = require('../models/internship');
const { Volunteering} = require('../models/volunteering.js');
const { Workshop} = require('../models/workshop');
const config = require('config');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

router.post('/', async (req, res) => {
    const userVerification = JSON.parse(jwtVerification(req, res));

    let user = await User.findOne({ _id: userVerification["_id"] });

    if (user["favorites"].includes(req.body["_id"])){
        user["favorites"].remove(req.body["_id"])
        newFavorites = user["favorites"]
        console.log("Updating user with ID " + userVerification["_id"] + " to remove favorite with ID " + req.body["_id"])
    } else {
        user["favorites"].push(req.body["_id"])
        newFavorites = user["favorites"]
        console.log("Updating user with ID " + userVerification["_id"] + " to add favorite with ID " + req.body["_id"])
    }

    User.updateOne({ _id: userVerification["_id"]}, {$set: {favorites: newFavorites}}, (err, res) => {
        if (err) throw err;
        
    });

    res.end()
});

module.exports = router;

router.get('/', async (req, res) => {

    let adjustedDate = new Date();
    adjustedDate = adjustedDate.getTime() - 25200000;
    
    const userVerification = JSON.parse(jwtVerification(req, res));

    let user = await User.findOne({ _id: userVerification["_id"]});

    const favorites = user["favorites"]

    let internships = await Internship.find({"_id":  { $in: favorites}, "dateExpiring":{ $gte: adjustedDate}});

    let volunteerings = await Volunteering.find({"_id":  { $in: favorites}, "dateExpiring":{ $gte: adjustedDate}});

    let orgs = []

    volunteerings.forEach( value => {
        orgs.push(value.organization);
    })

    let orgsUnique = [...new Set(orgs)]

    let workshops = await Workshop.find(
        {
            "dateExpiring":{ $gte: adjustedDate}, 
            $or: [
                {"_id":  { $in: favorites}}, 
                {"organization": {$in: orgsUnique}}
            ]
        }
    );

    res.render('favorite', {user: user, favorites: {internships: internships, volunteerings: volunteerings, workshops: workshops}});

});