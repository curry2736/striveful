const express = require('express');
const router = express.Router();
const { Internship, validate } = require('../models/internship');
const { Volunteering } = require('../models/volunteering.js');
const { Workshop } = require('../models/workshop');
const { User, jwtVerification, isUser } = require('../models/user');


router.get('/', async(req, res) => {
    // const didIGetIn = jwtVerification(req, res);
    // console.log(didIGetIn + "metro boomin");
    const verif = await JSON.parse(jwtVerification(req,res));
    const user = await User.findById(verif._id);
    //console.log(user.isCompany)
    // const didIGetIn = jwtVerification(req, res);
    // console.log(didIGetIn);
    if (user.isCompany) {
        res.render('company', {
            page: "get",
            type: "type",
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
    let type = "";
    if (user.isCompany) {
        try {
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

            console.log(type)
            console.log("edit page!!!")
            if (type == "Internship") {
                return res.render('company', {
                    page: "edit",
                    type: type,
                    user: user,
                    _id: req.params.id,
                    eventName: event.jobTitle,
                    email: event.email,
                    organization: event.companyName,
                    websiteLink: event.websiteLink,
                    description: event.description,
                    city: event.city,
                    state: event.state,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    datePosted: event.datePosted,
                    dateExpiring: event.dateExpiring
                })
            } else if (type == "Club") {
                return res.render('company', {
                    page: "edit",
                    type: type,
                    user: user,
                    _id: req.params.id,
                    eventName: event.eventName,
                    email: event.email,
                    organization: event.companyName,
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

        } catch (err) {
            console.log(err)
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
    //console.log(user);
    // const eventsCreated = user.eventsCreated;
    if (req.body.category == "Internship") {
    const internship = new Internship({
        jobTitle: req.body.jobTitle,
        email: req.body.email,
        companyName: req.body.companyName,
        websiteLink: req.body.link,
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
        res.render('company', {
            page: "get",
            user: user,
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
    } catch (err) {
        console.log(err)
        res.render('company', {
                user: user,
                internship: internship,
                errorMessage: "error.details[0].message",
                page: "get",
                user: user,
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
          res.render('company', {
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
    } catch {
        res.render('company', {
                volunteering: volunteering,
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
    else if (req.body.category == "Workshop"){
        const workshop = new Workshop({
            eventName: req.body.jobTitle,
            email: req.body.email,
            organization: req.body.companyName,
            websiteLink: req.body.link,
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
              res.render('company', {
                page: "get",
                user: user,
                _id: "",
                eventName: "",
                email: "",
                organization: "",
                websiteLlink: "",
                description: "",
                city: "",
                state: "",
                startDate: "",
                endDate: "",
                datePosted: "",
                dateExpiring: ""
            })
        } catch {
            res.render('company', {
                    user: user,
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
    
    
    
   
   

})

router.put('/edit/:id', async (req, res) => {
    let userVerification = null
    let type = "";

    if (isUser(req,res)) {
        userVerification = isUser(req, res);
    }
    let user = null
    if (userVerification != null){
        user = await User.findOne({ _id: userVerification });
    } else {
        return res.redirect('/')
    }
    
    let sentEvent = {event: await Volunteering.findById(req.params.id)}
    type = "Volunteering"

    if (!sentEvent.event) {
        event = await Internship.findById(req.params.id)
        type = "Internship"             
    } else if (!sentEvent.event) {
        event = await Workshop.findById(req.params.id)
        type = "Workshop"
    }

    if (type == "Workshop") {
        await Workshop.deleteOne({"_id": req.params.id})
    } else if (type == "Internship") {
        await Internship.deleteOne({"_id": req.params.id})
    } else {
        await Volunteering.deleteOne({"_id": req.params.id})
    }

    await User.update(
        {'_id': userVerification}, 
        { $pull: { "eventsCreated" : { id: req.params.id } } }, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({'error' : 'error in deleting address'});
            }
            console.log(data)
        },
    );

    if (req.body.category == "Internship") {
        const internship = new Internship({
            jobTitle: req.body.jobTitle,
            email: req.body.email,
            companyName: req.body.companyName,
            link: req.body.link,
            description: req.body.description,
            city: req.body.city,
            state: req.body.state,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            datePosted: req.body.datePosted,
            dateExpiring: req.body.dateExpiring
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
            console.log(err)
            res.render('company', {
                    user: user,
                    type: type,
                    internship: internship,
                    errorMessage: "error.details[0].message",
                    page: "get",
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
        }
        else if (req.body.category == "Club"){
        const volunteering = new Volunteering({
            eventName: req.body.jobTitle,
            email: req.body.email,
            organization: req.body.companyName,
            link: req.body.link,
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
            const newVolunteering = await volunteering.save();
            var event = {
                id: newVolunteering._id.toString(),
                type: "volunteering"
              };
              user.eventsCreated.push(event)
              await user.save()
              res.render('company', {
                page: "get",
                user: user,
                type: type,
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
        } catch {
            res.render('company', {
                    volunteering: volunteering,
                    type: type,
                    errorMessage: "error.details[0].message",
                    page: "get",
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
        }
        else if (req.body.category == "Workshop"){
            const workshop = new Workshop({
                eventName: req.body.jobTitle,
                email: req.body.email,
                organization: req.body.companyName,
                link: req.body.link,
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
                  res.redirect('/client-dashboard')
            } catch {
                res.render('company', {
                        user: user,
                        type: type,
                        workshop: workshop,
                        errorMessage: "error.details[0].message",
                        page: "get",
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
            }
    console.log("hi")
})

module.exports = router;


//dont worry about error.details for now
