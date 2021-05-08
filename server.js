const express = require('express');
const app = express();
// const multer = require('multer');
const port = 3000;
const path = require('path');
const dogs = ['David', 'Inju', 'Nina', 'Anna']


console.log('hello world')

// statische pagina's
app.use(express.static('/public/'))

// template engine 
app.set('views', 'view')
app.set('view engine', 'ejs')

// routes
app.get('/', function(req, res) {
res.render('login', {hondenNamen: dogs})

})
app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    
    })

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/public/404.html'))
    })

//Server check
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
