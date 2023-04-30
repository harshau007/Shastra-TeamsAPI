const express = require('express')
const mongoose = require('mongoose')
const coreteamsModel = require('./models/coreteamsModel')
const subcoreteamsModel = require('./models/subcoreteamsModel')
const app = express()
require('dotenv').config();
var port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0');
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/teams', (req, res) => {
    res.send("Welcome to Shastra Coding Club's Team Section")
})


// Connected to DataBase
mongoose.
connect(process.env.DataBaseURI)
.then(()=>{
    console.log("Connected to MongoDB")
    app.listen(3000, ()=>{
        console.log("App running on http://localhost:3000")
    })
}).catch((error) => {
    console.log(error)
})


app.get('/', (req, res) => {
    res.send("Welcome to Shastra Coding Club")
})


// Add core members
app.post('/addcoreteamMember', async(req, res) => {
    try {
        const member = await coreteamsModel.create(req.body)
        res.status(200).json(member)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// Add subcore members
app.post('/addsubcoreteamMember', async(req, res) => {
    try {
        const member = await subcoreteamsModel.create(req.body)
        res.status(200).json(member)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


// Get Core Members
app.get('/coreMembers', async(req, res) => {
    try {
        const coreMembers = await coreteamsModel.find({});
        res.status(200).json(coreMembers);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/coreMember/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const coreMember = await coreteamsModel.findById(id);
        res.status(200).json(coreMember);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Get Sub core members
app.get('/subcoreMembers', async(req, res) => {
    try {
        const subcoreMembers = await subcoreteamsModel.find({});
        res.status(200).json(subcoreMembers);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/subcoreMember/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const subcoreMember = await subcoreteamsModel.findById(id);
        res.status(200).json(subcoreMember);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
