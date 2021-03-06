const express = require('express')
const req = require('express/lib/request')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const logging = (req, res, next) => {
    console.log(req.body.number)
    next()
}

const args = require("minimist")(process.argv.slice(2))

args["port"]

const port = args.port || 5000

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

function coinFlips(flips) {
    const resultArray = new Array();
  
    for (let i = 0; i < flips; i++) {
  
      resultArray[i] = coinFlip();
  
    }
  
    return resultArray;
}

function countFlips(array) {
    let tailsCount = 0;
    let headsCount = 0;

    for (let i = 0; i < array.length; i++) {

      if (array[i] === 'heads') {
        headsCount++;
      } else {
        tailsCount++;
      }

    }
    
    if (tailsCount > 0 && headsCount === 0) {

      return { tails: tailsCount};

    }

    if (headsCount === 0 && headsCount > 0) {

      return { heads: headsCount };

    }

    var returnObj = { tails: tailsCount, heads: headsCount }

    return returnObj;

}

function flipACoin(call) {

    let flipResult = coinFlip();
  
    if (flipResult === call) {
      return {call: call, flip: flipResult, result: 'win'};
    } else {
      return {call: call, flip: flipResult, result: 'lose'};
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

app.get('/app/flips/:number', (req, res) => {

    let array = coinFlips(req.params.number);

    res.status(200).json({ 'raw' : array, 'summary' : countFlips(array) })
})

app.get('/app/flip/call/:call', (req, res) => {
    res.status(200).json( flipACoin(req.params.call) )
})

app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})