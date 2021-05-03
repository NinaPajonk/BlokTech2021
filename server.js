const express = require('express');
const app = express();
const multer = require('multer');
const port = 3000;

console.log('hello world')


// statische pagina's
app.use(express.static('public'))

// routes
app.get('*', function(req, res){
res.sendFile(path.join(__dirname, '/404.html'))
})

app.get('/login', function(req, res) {
res.sendFile(path.join(__dirname, '/index.html'))

})
app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
    
    })

//Server check
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
