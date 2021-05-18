const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path'); 
const mongo = require('mongoose');



const html = dogs.map(dog=> {
    return `
<article class="dog">
<a href="#${dog.id}">
<p>${dog.name}</p>
<p>${dog.gender} </p>
<p>${dog.prijs}</p>
</a>
</article>`
}).join('')

console.log(dog.id)

// MongoDB Database
require('dotenv').config();

let db = null;
let collectiondogs = null;
const url ='mongodb+srv://asd123:asd123@cluster0-ofs74.mongodb.net/test?retryWrites=true&w=majority'

mongo.MongoClient.connect(url, function(err, client) {
  if (err) {
    throw err;
  }
  db = client.db(process.env.DB_NAME);
  console.log("Verbinden met de database");
  usersCollection = db.collection("collectiondogs");
  
});




// filteren 
// let filteredDogs = []
// if (dogs.findOne({ras: req.body.ras})) {
//     // result.filteredDogs.push()
// }
// console.log (filteredDogs);





// bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

// statische pagina's
app.use(express.static(__dirname + '/public/'))


// template engine 
app.set('views', 'view')
app.set('view engine', 'ejs')

// routes (dynamische pagina's)
app.get('/', function(req, res) {
res.render('overview', {hondenNamen: dogs})

})
// test
app.get('/test', function(req, res) {
    res.render('test', {dog: html })
    
    })

app.get('/register', function(req, res) {
    res.render('register')
    
    })
// handling error 404 statichs
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/public/404.html'))
    })



//Server check
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
