const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const dogs = require('./dogs.json')

// dot env
// require('dotenv').config()

// Mongoose Schema
const Schema = mongoose.Schema;

const dogscollectionSchema = new Schema({
    id: {
        type: String,
        required: true
    },
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
    }
}, {
    collection: 'dogscollection'
});

const dogsdb = mongoose.model('dogscollection', dogscollectionSchema);


// html inladen
const html = dogs.map(dog => {
    return `
<article class="dog">
<a href="#${dog.id}">
<p>${dog.name}</p>
<p>${dog.gender} </p>
<p>${dog.prijs}</p>
</a>
</article>`
}).join('')



// MongoDB Database
const db = mongoose.connection;

const url = 'mongodb+srv://Walvishaai18:Walvishaai18@cluster0.ofs74.mongodb.net/databasedogs?retryWrites=true&w=majority'
mongoose.connect(url, {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
});



dogsdb.find({
    kleur: 'wit'
}), (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
};


// bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));

// statische pagina's
app.use(express.static(__dirname + '/public/'))


// template engine 
app.set('views', 'view');
app.set('view engine', 'ejs')

// routes (dynamische pagina's)
app.get('/', function (req, res) {
    res.render('overview', {
        hondenNamen: dogs
    })

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


//Server check
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})