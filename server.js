//server set up

const express = require('express')
const app = express()

const configDB = require('./config/database.js');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

let db;

// connect to our database
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
}); 

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public')) //whatever you put this public folder is hosted. They go live so you don't need to create a route for it

app.get('/', (req, res) => {
  db.collection('lines').find().toArray((err, result) => {
    for (let i = result.length - 1; i > 0; i--) { //here we run a loop beginnig at the end of the array
      const j = Math.floor(Math.random() * (i + 1)); 

      // Swap elements here!
      [result[i], result[j]] = [result[j], result[i]];
    }
    if (err) return console.log(err)
    res.render('index.ejs', { lines: result }) //the output of this rendering is html. Shuffle it here 
  })
})

//THIS WILL ADD NEW LINES TO OUR PAGE ================
app.post('/lines', (req, res) => {
  // console.log(req) //to check if the request goes through. It'll be loooong
  db.collection('lines').insertOne({ name: req.body.name, line: req.body.line }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

//THIS WILL LET US UPDATE THE NAME ===================================
app.put('/lines', (req, res) => {
  db.collection('lines')
    .findOneAndUpdate({ _id: new ObjectID(req.body.lineId) }, {
      $set: {
        name: "anonymous"
      } 
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

//DELETE INDIVIDUAL LINES ===================================
app.delete('/line', (req, res) => {
  db.collection('lines').findOneAndDelete({_id: new ObjectID (req.body.lineId)}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Line deleted!')
  })
})

app.listen(8000);