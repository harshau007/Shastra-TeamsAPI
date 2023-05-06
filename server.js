const express = require('express')
const mongoose = require('mongoose')
const coreteamsModel = require('./models/coreteamsModel')
const subcoreteamsModel = require('./models/subcoreteamsModel')
const currentEvent = require('./models/currentEvent')
const carousel = require('./models/carousel');
const cors = require('cors');
const app = express()
require('dotenv').config();
var port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0');
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/teams', (req, res) => {
    res.send("Welcome to Shastra Coding Club's Team Section")
})


// Connected to DataBase
mongoose.
    connect(process.env.DataBaseURI)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(3000, () => {
            console.log("App running on http://localhost:3000")
        })
    }).catch((error) => {
        console.log(error)
    })


app.get('/', (req, res) => {
    res.send("Welcome to Shastra Coding Club")
})

/*******************Members Section*********************/

// Add core members
app.post('/addCoreteamMember', async (req, res) => {
    try {
        const member = await coreteamsModel.create(req.body)
        res.status(200).json(member)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// Add subcore members
app.post('/addSubcoreteamMember', async (req, res) => {
    try {
        const member = await subcoreteamsModel.create(req.body)
        res.status(200).json(member)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})


// Get Core Members
app.get('/coreMembers', async (req, res) => {
    try {
        const coreMembers = await coreteamsModel.find({});
        res.status(200).json(coreMembers);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/coreMember/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const coreMember = await coreteamsModel.findById(id);
        res.status(200).json(coreMember);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Get Sub core members
app.get('/subcoreMembers', async (req, res) => {
    try {
        const subcoreMembers = await subcoreteamsModel.find({});
        res.status(200).json(subcoreMembers);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/subcoreMember/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const subcoreMember = await subcoreteamsModel.findById(id);
        res.status(200).json(subcoreMember);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Update core members
app.put('/updateCoreMember/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const member = await coreteamsModel.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!member) {
            return res.status(404).json({ message: `cannot find any Member with ID ${id}` })
        }
        const updatedMember = await coreteamsModel.findById(id);
        res.status(200).json(updatedMember);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Update subcore members
app.put('/updateSubCoreMember/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const member = await subcoreteamsModel.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!member) {
            return res.status(404).json({ message: `cannot find any Member with ID ${id}` })
        }
        const updatedMember = await subcoreteamsModel.findById(id);
        res.status(200).json(updatedMember);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Delete core Member
app.delete('/deleteCoreMember/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const member = await coreteamsModel.findByIdAndDelete(id);
        if (!member) {
            return res.status(404).json({ message: `cannot find any member with ID ${id}` })
        }
        res.status(200).json(member);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Delete Subcore member
app.delete('/deleteSubcoreMember/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const member = await subcoreteamsModel.findByIdAndDelete(id);
        if (!member) {
            return res.status(404).json({ message: `cannot find any member with ID ${id}` })
        }
        res.status(200).json(member);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/*******************Event Section*********************/

// Add event
app.post('/addEvent', async (req, res) => {
    try {
        const event = await currentEvent.create(req.body)
        res.status(200).json(event)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})


// Get Event
app.get('/events', async (req, res) => {
    try {
        const events = await currentEvent.find({});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/event/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const event = await currentEvent.findById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


/********************Carousel********************/

// Add carousel members
app.post('/addCarousel', async (req, res) => {
    try {
        const Carousel = await carousel.create(req.body)
        res.status(200).json(Carousel)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// Update carousel members
app.put('/updateCarousel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const Carousel = await carousel.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!Carousel) {
            return res.status(404).json({ message: `cannot find any Carousel with ID ${id}` })
        }
        const updateCarousel = await carousel.findById(id);
        res.status(200).json(updateCarousel);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Delete Carousel member
app.delete('/deleteCarousel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const Carousel = await carousel.findByIdAndDelete(id);
        if (!Carousel) {
            return res.status(404).json({ message: `cannot find any carousel with ID ${id}` })
        }
        res.status(200).json(Carousel);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get carousel
app.get('/carousel', async (req, res) => {
    try {
        const Carousel = await carousel.find({});
        res.status(200).json(Carousel);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/carousel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const Carousel = await carousel.findById(id);
        res.status(200).json(Carousel);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})