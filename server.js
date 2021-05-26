const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');



// "storage" voor de upgeloade afbeeldingen
// bron voor images uploaden: https://www.youtube.com/watch?v=9Qzmri1WaaE
const storage = multer.diskStorage({
    destination: './public/uploads/images',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }

});

// upload

const upload = multer({
    storage: storage,
    limits: {
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);

        }
    }
}).single('profielfoto');

// check file type

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimeType)
    if (mimeType && extName) {
        return cb(null, true);

    } else {
        cb('Error: Images only!')
    }
}


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
// hulp gehad van Inju Michorius van de minor web development
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
        data: Buffer,
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



app.get('/', (req, res) => {
    res.render('add')
})

app.get('/puppy-filteren', (req, res) => {
    res.render('filter')
})


app.get('/register', function (req, res) {
    res.render('register')

})
// handling error 404 static
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/HTML/404.html'))
})


// dog toevoegen form /add
app.post('/add', (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            console.log(err);

        }
        console.log(req.file);


        const newDog = {
            name: req.body.naam,
            ras: req.body.ras,
            gender: req.body.gender,
            kleur: req.body.kleur,
            prijs: req.body.prijs,
            geboortedatum: req.body.geboortedatum,
            profielfoto: req.file ? req.file.filename : null
        }

        const data = new dogsdb(newDog)
        data.save();
        dogsdb.find({}, function (err, dogs) {
            if (err) {
                console.log(err)
            } else {
                console.log(newDog)
                res.render('overview', {
                    results: dogs,
                    file: `uploads/images/${req.file.filename}`
                })
            }
        })
    });
});
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
                results: resultDogs,
              
            });
        }
        
    });

});




//Server check
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})