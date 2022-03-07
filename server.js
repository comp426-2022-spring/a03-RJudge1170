const express = require('express')
const req = require('express/lib/request')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const logging = (req, res, next) => {
    console.log(req.body.number)
    next()
}

var port = 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

function coinFlip() {
  
    let x = Math.floor(Math.random() * 10);
  
    if (x < 5) {
      return 'heads';
    } else {
      return 'tails';
    }
  }

app.get('/app', (req, res) => {
    res.type('text/plain')
    res.status(200).end('OK')
})

app.get('/app/echo/:number', express.json(), (req, res) => {
    res.status(200).json({ 'message' : req.params.number })
})

// app.get('/app/echo/', (req, res) => {
   // res.status(200).json({ 'message' : req.query.number })
// })

app.get('/app/echo/', logging, (req, res) => {
    res.status(200).json({ 'message' : req.body.number })
})

app.get('/app/flip', (req, res) => {
    res.status(200).json({ 'flip' : coinFlip() })
})

app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})