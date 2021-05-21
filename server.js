const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

// dot env
require('dotenv').config()

// MongoDB Database
const db = mongoose.connection;

const url = 'mongodb+srv://Walvishaai18:Walvishaai18@cluster0.ofs74.mongodb.net/databasedogs?retryWrites=true&w=majority'
mongoose.connect(url, {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected')
})

// Mongoose Schema
const Schema = mongoose.Schema;

const dogscollectionSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    ras: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    kleur: {
        type: String,
        required: true
    },
    prijs: {
        type: String,
        required: true
    },
    geboortedatum: {
        type: String,
        required: true
    },
    profielfoto:{
        type: String,
        required: true
    }


}, {
    collection: 'dogscollection'
});

const dogsdb = mongoose.model('dogscollection', dogscollectionSchema);


// statische pagina's
app.use(express.static(__dirname + '/public/'))

// template engine 
app.set('views', 'view');
app.set('view engine', 'ejs')

// bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));


// routes (dynamische pagina's)
app.get('/', (req, res) => {
    res.render('overview')

})

app.get('/puppy-toevoegen', (req, res) => {
    res.render('add')
})

app.get('/puppy-filteren', (req, res) => {
    res.render('filter')
})

// test html inladen
app.get('/test', function (req, res) {
    res.render('test', {
        dog: html
    })

})

app.get('/register', function (req, res) {
    res.render('register')

})
// handling error 404 static
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/404.html'))
})


// dog toevoegen form /add
app.post('/add', function (req, res) {
    const newDog = {
        name: req.body.naam,
        ras: req.body.ras,
        gender: req.body.gender,
        kleur: req.body.kleur,
        prijs: req.body.prijs,
        geboortedatum: req.body.geboortedatum,
        profielfoto: req.body.profielfoto

    }

    const data = new dogsdb(newDog)
    data.save();
    res.render('test', {

    })
})

// dog zoeken filter /search
app.post('/search', function (req, res) {
            dogsdb.find({
                    ras: req.body.ras


                })
res.render('overview', {

                })

            })
            

        // html inladen
        // const html = dogs.map(dog => {
        //     return `
        // <article class="dog">
        // <a href="#${dog.id}">
        // <p>${dog.name}</p>
        // <p>${dog.gender} </p>
        // <p>${dog.prijs}</p>
        // </a>
        // </article>`
        // }).join('')





        //Server check
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })