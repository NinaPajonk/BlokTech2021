const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path');

const dogs = [{
    "id" : 1,
    "name" : "David",
    "ras": "Labrador",
    "gender": "reutje",
    "kleur": "wit",
    "prijs": 800,
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kekamsterdam.com%2Fnl%2Fmuursticker-labrador-puppy.html&psig=AOvVaw1E7a2lxFc4kAkdthhW5j6o&ust=1620741013673000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNixoP-gv_ACFQAAAAAdAAAAABAD"
},
{
    "id" : 2,
    "name" : "Anna",
    "ras": "Mopshond",
    "gender": "teefje",
    "kleur": "zwart",
    "prijs": 1000,
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.puppygroep.nl%2Fhondenrassen%2Fmopshond%2F&psig=AOvVaw02x-MI0C4433Ege5A-3gHO&ust=1620741119146000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIis76mhv_ACFQAAAAAdAAAAABAJ"
},
{
    "id" : 3,
    "name" : "Inju",
    "ras": "Pomeriaan",
    "gender": "reutje",
    "kleur": "grijs",
    "prijs": 1750,
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pomeranianresidence.nl%2FDe-Pomeriaan%2F&psig=AOvVaw2qImdkMkItY1Cz_TunQlPb&ust=1620741247246000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjg5eWhv_ACFQAAAAAdAAAAABAD"
},
{
    "id" : 4,
    "name" : "Nina",
    "ras": "Toypoedel",
    "gender": "teefje",
    "kleur": "bruin",
    "prijs": 2000,
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2F779545016750530944%2F&psig=AOvVaw39JdkVKKa-9k-H8S0YG1SK&ust=1620741319036000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCAlI-iv_ACFQAAAAAdAAAAABAE"
},
{
    "id" : 5,
    "name": "Wolf",
    "ras": "Syberische husky",
    "gender": "reutje",
    "kleur": "grijs",
    "prijs": 1500,
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnl.pinterest.com%2Fpin%2F521432463099661349%2F&psig=AOvVaw0AfX3YOTEqmQHu95v6qboP&ust=1620741373898000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOD08qOiv_ACFQAAAAAdAAAAABAD"
},
{
    "id" : 6,
    "name": "Danny",
    "ras": "Chihuahua",
    "gender": "reutje",
    "kleur": "bruin",
    "prijs": 800,
    "image": "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.ansangels.nl%2F&psig=AOvVaw1Gdtu6k-ogcwU_LEC71WLR&ust=1620741425916000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCICsmr6iv_ACFQAAAAAdAAAAABAJ"
},
{
    "id" : 7,
    "name": "Momo",
    "ras": "Keeshond",
    "gender": "teefje",
    "kleur": "wit",
    "prijs": 1900,
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhondkatpet.com%2Fdwergkees-pomeriaan-prijs-uiterlijk-persoonlijkheid%2F&psig=AOvVaw2fURC1AkHrgmQBFaWrdKwH&ust=1620741576792000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODTwoqjv_ACFQAAAAAdAAAAABAD"
}
]

console.log(dogs[4].ras)
// filteren 
let filteredDogs = []
if (dogs.findOne({ras: req.body.ras})) {
    result.filteredDogs.push()
}
console.log (filteredDogs);



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
