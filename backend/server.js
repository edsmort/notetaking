const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://10.128.0.13:27017';

const dbName = 'EdNotes';
let db

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err);
    db = client.db(dbName);
    console.log(`Connected Mongodb: ${url}`);
    console.log(`Database: ${dbName}`);
});

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

app.listen(3001, function() {
    console.log('listening on 3001')
});

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Missing email and/or password");
        }
        const existing = await db.collection('Users').findOne({ email });

        if (existing) {
            return res.status(409).send("An account with this email already exists");
        }
        const user = {
            email: email,
            password: password,
            notes: []
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return console.log(err);
            user.password = hash;
        });
        db.collection('Users').insertOne(user);
        res.status(200).send("User created!");
    } catch (err) {
        console.log(err)
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Missing email and/or password");
        }
        const user = await db.collection('Users').findOne({ email });
        if (user && password == user.password) {
            const emailNotes = {
                email: user.email,
                notes: user.notes
            }
            res.status(200).json(emailNotes);
        }
    } catch (err) {
        console.log(err)
    }
});

app.post('/notes', async (req, res) => {
    try {
        const { email, notes } = req.body;
        const user = await db.collection('Users').findOne({ email });
        if (user) {
            db.collection('Users').updateOne({_id:user._id}, {$set: {notes:notes}});
            res.status(200);
        }
    } catch (err) {
        console.log(err);
    }
});
