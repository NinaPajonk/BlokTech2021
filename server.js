const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');


// defineer plek voor de upgeloade afbeeldingen
const storage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, './public/uploads/images');
    },
    // add back afbeeldingen
    filename: function (req, file, callback) {
        callback(null, Date.now() + (file.originalname))
    }
});

//upload paremeter for multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3,
    },
})

// dot env
require('dotenv').config()

// MongoDB Database
const url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@cluster0.ofs74.mongodb.net/databasedogs?retryWrites=true&w=majority'
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
    profielfoto: {
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



app.get('/puppy-toevoegen', (req, res) => {
    res.render('add')
})

app.get('/puppy-filteren', (req, res) => {
    res.render('filter')
})

// test html inladen
app.get('/test', function (req, res) {
    res.render('test', {

    })

})

app.get('/register', function (req, res) {
    res.render('register')

})
// handling error 404 static
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/HTML/404.html'))
})


// dog toevoegen form /add
app.post('/add', upload.single('image'), function (req, res) {
    // console.log(request.file)
    const newDog = {
        name: req.body.naam,
        ras: req.body.ras,
        gender: req.body.gender,
        kleur: req.body.kleur,
        prijs: req.body.prijs,
        geboortedatum: req.body.geboortedatum,
        profielfoto: req.file.profielfoto


    }
    const data = new dogsdb(newDog)
    data.save();
    dogsdb.find({}, function (err, dogs) {
        if (err) {
            console.log(err)
        } else {
            res.render('overview', {
                results: dogs
            })
        }
    })
})

// dog zoeken filter /search
app.post('/search', function (req, res) {
    dogsdb.find({
        ras: req.body.ras,
        gender: req.body.gender,
        kleur: req.body.kleur

    }, function (err, resultDogs) {
        if (err) {
            console.log(err)
        } else {
            console.log(resultDogs)
            res.render('overview', {
                results: resultDogs
            })

        }
    })

})




//Server check
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})