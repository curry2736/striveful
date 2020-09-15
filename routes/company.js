const express = require('express');
const router = express.Router();
const { Internship, validate } = require('../models/internship');
const { Volunteering } = require('../models/volunteering.js');
const { Workshop } = require('../models/workshop');
const { User, jwtVerification, isUser } = require('../models/user');
const mongoose = require('mongoose');

router.get('/', async(req, res) => {
    // const didIGetIn = jwtVerification(req, res);
    // console.log(didIGetIn + "metro boomin");
    const verif = await JSON.parse(jwtVerification(req,res));
    const user = await User.findById(verif._id);

    if (user.isCompany) {
        res.render('company', {
            page: "get",
            type: "",
            user: user,
            _id: "",
            eventName: "",
            email: "",
            organization: "",
            link: "",
            description: "",
            city: "",
            state: "",
            startDate: "",
            endDate: "",
            datePosted: "",
            dateExpiring: ""
        })
        
    }
    else{
        res.redirect("/")
    }
})

router.get('/edit/:id', async(req, res) => {
    
    let userVerification = null
    if (isUser(req,res)) {
        userVerification = isUser(req, res);
    }
    let user = null
    if (userVerification != null){
        user = await User.findOne({ _id: userVerification });
    } else {
        return res.redirect('/')
    }
    
    let hasEvent = false
    for (var event of user.eventsCreated) {
        if (event.id == req.params.id) {
            hasEvent = true
            break;
        }
    }
    console.log(hasEvent)


    let type = "";

    if ((user.isCompany && mongoose.Types.ObjectId.isValid(req.params.id)) && hasEvent) {

        let event = await Volunteering.findById(req.params.id)
        type = "Volunteering"
        if (!event) {
            event = await Internship.findById(req.params.id)
            type = "Internship"    
            if (!event) {
                event = await Workshop.findById(req.params.id)
                type = "Workshop"
            }         
        } 


        let jsonText = JSON.stringify({ content: event.description })
        event.description = JSON.parse(jsonText)["content"].split('\r\n').join('NEW_LINE')
        if (type == "Internship") {
            return res.render('company', {
                page: "edit",
                type: type,
                user: user,
                _id: req.params.id,
                eventName: event.jobTitle,
                email: event.email,
                organization: event.organization,
                websiteLink: event.websiteLink,
                description: event.description,
                city: event.city,
                state: event.state,
                startDate: event.startDate,
                endDate: event.endDate,
                datePosted: event.datePosted,
                dateExpiring: event.dateExpiring
            })
        } else if (type == "Volunteering") {

            return res.render('company', {
                page: "edit",
                type: type,
                user: user,
                _id: req.params.id,
                eventName: event.eventName,
                email: event.email,
                organization: event.organization,
                description: event.description,
                city: event.city,
                state: event.state,
                websiteLink: event.websiteLink,
                formLink: event.formLink,
                teamsLink: event.teamsLink,
                youtubeLink: event.youtubeLink,
                presidentEmail: event.presidentEmail,
                advisorEmail: event.advisorEmail,
                startDate: event.startDate,
                endDate: event.endDate,
                datePosted: event.datePosted,
                dateExpiring: event.dateExpiring
            })
        } else {
            return res.render('company', {
                page: "edit",
                type: type,
                user: user,
                _id: req.params.id,
                eventName: event.eventName,
                email: event.email,
                organization: event.organization,
                websiteLink: event.websiteLink,
                description: event.description,
                city: event.city,
                state: event.state,
                startDate: event.startDate,
                endDate: event.endDate,
                datePosted: event.datePosted,
                dateExpiring: event.dateExpiring
            })
        }
        
    } else {
        res.redirect("/")
    }
})

router.post('/', async (req, res) => {
   
    // First Validate The Request
    // const { error } = validate(req.body);
    // console.log(validate(req.body));
    // console.log(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }
    

    
    const verif = await JSON.parse(jwtVerification(req,res));
    const user = await User.findById(verif._id);

    /*let hasEvent = false
    for (var event of user.eventsCreated) {
        if (event.id == req.params.id) {
            hasEvent = true
            break;
        }
    }*/
    //console.log(user);
    // const eventsCreated = user.eventsCreated;

        if (req.body.category == "Internship") {
            const internship = new Internship({
                jobTitle: req.body.jobTitle,
                email: req.body.email,
                companyName: req.body.companyName,
                websiteLink: req.body.websiteLink,
                description: req.body.description,
                city: req.body.city,
                state: req.body.state,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                datePosted: req.body.datePosted,
                dateExpiring: req.body.dateExpiring
            })
            console.log(req.body.startDate)
            console.log(req.body.endDate)
            console.log(req.body.datePosted)
            console.log(req.body.dateExpiring)
            try {
                const newInternship = await internship.save()
                console.log(newInternship._id)
                var event = {
                    id: newInternship._id.toString(),
                    type: "internship"
                };
                user.eventsCreated.push(event)
                await user.save()
                console.log("i ran")
                return res.redirect('/client-dashboard')
            } catch (err) {
                console.log("i ran2")
                return res.redirect('/client-dashboard')
            }
        }
        else if (req.body.category == "Club"){
            const volunteering = new Volunteering({
                eventName: req.body.jobTitle,
                organization: req.body.companyName,
                email: req.body.email,
                description: req.body.description,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                datePosted: req.body.datePosted,
                city: req.body.city,
                state: req.body.state,
                websiteLink: req.body.websiteLink,
                formLink: req.body.formLink,
                dateExpiring: req.body.dateExpiring,
                teamsLink: req.body.teamsLink,
                youtubeLink: req.body.youtubeLink,
                presidentEmail: req.body.presidentEmail,
                advisorEmail: req.body.advisorEmail,

            })
            // console.log(req.body);
            // const { error } = validate(req.body);
            // console.log(error);
            try {
                const newVolunteering = await volunteering.save();
                var event = {
                    id: newVolunteering._id.toString(),
                    type: "volunteering"
                };
                user.eventsCreated.push(event)
                await user.save()
                return res.redirect('/client-dashboard')
            } catch (err) {
                console.log(err)
                return res.render('company', {
                        volunteering: volunteering,
                        type: "",
                        errorMessage: "error.details[0].message",
                        page: "get",
                        user: user,
                        _id: "",
                        eventName: "",
                        email: "",
                        organization: "",
                        websiteLink: "",
                        formLink: "",
                        dateExpiring: "",
                        teamsLink: "",
                        youtubeLink: "",
                        presidentEmail: "",
                        advisorEmail: "",
                        description: "",
                        city: "",
                        state: "",
                        startDate: "",
                        endDate: "",
                        datePosted: "",
                        dateExpiring: ""
                    })
                }
        }
        else if (req.body.category == "Event"){
            const workshop = new Workshop({
                eventName: req.body.jobTitle,
                email: req.body.email,
                organization: req.body.companyName,
                websiteLink: req.body.websiteLink,
                description: req.body.description,
                city: req.body.city,
                state: req.body.state,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                datePosted: req.body.datePosted,
                dateExpiring: req.body.dateExpiring
            })
            // console.log(req.body);
            // const { error } = validate(req.body);
            // console.log(error);
            try {
                const newWorkshop = await workshop.save()
                var event = {
                    id: newWorkshop._id.toString(),
                    type: "workshop"
                };
                user.eventsCreated.push(event)
                await user.save()
                return res.redirect('/client-dashboard')
            } catch (err) {
                console.log(err)
                return res.render('company', {
                        user: user,
                        type: type,
                        workshop: workshop,
                        errorMessage: "error.details[0].message",
                        page: "get",
                        _id: "",
                        eventName: "",
                        email: "",
                        organization: "",
                        websiteLink: "",
                        description: "",
                        city: "",
                        state: "",
                        startDate: "",
                        endDate: "",
                        datePosted: "",
                        dateExpiring: ""
                    })
                }
            }
     
        //return res.redirect('/')
    
    
    
   
   

})

router.put('/edit/:id', async (req, res) => {
    let userVerification = null
    let type = "";
    console.log(req.body)
    if (isUser(req,res)) {
        userVerification = isUser(req, res);
    }
    let user = null
    if (userVerification != null){
        user = await User.findOne({ _id: userVerification });
    } else {
        return res.redirect('/')
    }

    var sentEvent = {event: null}

    try { 
        sentEvent = {event: await Volunteering.findById(req.params.id)}
        if (sentEvent.event != null) {
            type = "Volunteering"
            console.log("TYPE 0", type)
                sentEvent.event.eventName = req.body.jobTitle,
                sentEvent.event.organization = req.body.companyName,
                sentEvent.event.email = req.body.email,
                sentEvent.event.description = req.body.description,
                sentEvent.event.startDate = req.body.startDate,
                sentEvent.event.endDate = req.body.endDate,
                sentEvent.event.datePosted = req.body.datePosted,
                sentEvent.event.city = req.body.city,
                sentEvent.event.state = req.body.state,
                sentEvent.event.websiteLink = req.body.websiteLink,
                sentEvent.event.formLink = req.body.formLink,
                sentEvent.event.dateExpiring = req.body.dateExpiring,
                sentEvent.event.teamsLink = req.body.teamsLink,
                sentEvent.event.youtubeLink = req.body.youtubeLink,
                sentEvent.event.presidentEmail = req.body.presidentEmail,
                sentEvent.event.advisorEmail = req.body.advisorEmail,
                sentEvent.event.visits = sentEvent.event.visits   

        }

        if (sentEvent.event == null) {
            sentEvent.event = await Internship.findById(req.params.id)
            console.log("TYPE 1", type)
            type = "Internship"
            if (sentEvent.event != null) {
                sentEvent.event.jobTitle = req.body.jobTitle,
                sentEvent.event.email = req.body.email,
                sentEvent.event.companyName = req.body.companyName,
                sentEvent.event.websiteLink = req.body.websiteLink,
                sentEvent.event.description = req.body.description,
                sentEvent.event.city = req.body.city,
                sentEvent.event.state = req.body.state,
                sentEvent.event.startDate = req.body.startDate,
                sentEvent.event.endDate = req.body.endDate,
                sentEvent.event.datePosted = req.body.datePosted,
                sentEvent.event.dateExpiring = req.body.dateExpiring,
                sentEvent.event.visits = sentEvent.event.visits
            }             
        }
    } catch(err) {
        console.log(err)
    } 

    if (sentEvent.event == null) {
        sentEvent.event = await Workshop.findById(req.params.id)
        type = "Workshop"
        console.log("TYPE 2", type)
        if (sentEvent.event != null) {   
            sentEvent.event.eventName = req.body.jobTitle,
            sentEvent.event.email = req.body.email,
            sentEvent.event.organization = req.body.companyName,
            sentEvent.event.websiteLink = req.body.websiteLink,
            sentEvent.event.description = req.body.description,
            sentEvent.event.city = req.body.city,
            sentEvent.event.state = req.body.state,
            sentEvent.event.startDate = req.body.startDate,
            sentEvent.event.endDate = req.body.endDate,
            sentEvent.event.datePosted = req.body.datePosted,
            sentEvent.event.dateExpiring = req.body.dateExpiring,
            sentEvent.event.visits = sentEvent.event.visits
        }

    }
       
    
    await sentEvent.event.save()

    console.log(sentEvent.event.visits)

    console.log("TYPE LINE 336", type)

    /*if (type == "Workshop") {
        await Workshop.deleteOne({"_id": req.params.id})
    } else if (type == "Internship") {
        await Internship.deleteOne({"_id": req.params.id})
    } else {
        await Volunteering.deleteOne({"_id": req.params.id})
    }*/

    /*await User.update(
        {'_id': userVerification}, 
        { $pull: { "eventsCreated" : { id: req.params.id } } }, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({'error' : 'error in deleting address'});
            }
            console.log(data)
        },
    );*/
    
    console.log("BODY _-----------_")
    console.log(req.body)
    /*if (req.body.category == "Internship") {
        const internship = new Internship({
            jobTitle: req.body.jobTitle,
            email: req.body.email,
            companyName: req.body.companyName,
            websiteLink: req.body.websiteLink,
            description: req.body.description,
            city: req.body.city,
            state: req.body.state,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            datePosted: req.body.datePosted,
            dateExpiring: req.body.dateExpiring,
            visits: sentEvent.event.visits
        })
        try {
            
            const newInternship = await internship.save()
            console.log(newInternship._id)
            var event = {
                id: newInternship._id.toString(),
                type: "internship"
              };
              user.eventsCreated.push(event)
              await user.save()
            res.redirect('/client-dashboard')
        } catch (err) {
            console.log(req.body)
            console.log("internship error")
            //console.log(err)
            res.redirect('/client-dashboard')
            }
        }
        else if (req.body.category == "Club"){
            const volunteering = new Volunteering({
                eventName: req.body.jobTitle,
                organization: req.body.companyName,
                email: req.body.email,
                description: req.body.description,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                datePosted: req.body.datePosted,
                city: req.body.city,
                state: req.body.state,
                websiteLink: req.body.websiteLink,
                formLink: req.body.formLink,
                dateExpiring: req.body.dateExpiring,
                teamsLink: req.body.teamsLink,
                youtubeLink: req.body.youtubeLink,
                presidentEmail: req.body.presidentEmail,
                advisorEmail: req.body.advisorEmail,
                visits: sentEvent.event.visits
            })
            console.log(req.body);
            // const { error } = validate(req.body);
            // console.log(error);
            try {
                const newVolunteering = await volunteering.save();
                var event = {
                    id: newVolunteering._id.toString(),
                    type: "volunteering"
                };
                user.eventsCreated.push(event)
                await user.save()
                res.redirect('/client-dashboard')
            } catch {
                res.redirect('/client-dashboard')
            }
        }
        
        else if (req.body.category == "Event"){
            const workshop = new Workshop({
                eventName: req.body.jobTitle,
                email: req.body.email,
                organization: req.body.companyName,
                websiteLink: req.body.websiteLink,
                description: req.body.description,
                city: req.body.city,
                state: req.body.state,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                datePosted: req.body.datePosted,
                dateExpiring: req.body.dateExpiring,
                visits: sentEvent.event.visits
            })
            console.log(workshop)
            // console.log(req.body);
            // const { error } = validate(req.body);
            // console.log(error);
            try {
                const newWorkshop = await workshop.save()
                var event = {
                    id: newWorkshop._id.toString(),
                    type: "workshop"
                  };
                console.log("aba")
                console.log(event)
                  user.eventsCreated.push(event)
                  await user.save()
                  res.redirect('/client-dashboard')
            } catch(err) {
                console.log(err)
                res.redirect('/client-dashboard')
            }
        }*/

    res.redirect('/client-dashboard')
    console.log("hi")
})

module.exports = router;


//dont worry about error.details for now
