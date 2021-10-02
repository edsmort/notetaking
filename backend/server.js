const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const dbName = 'EdNotes';
let db

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    db = client.db(dbName);
    console.log(`Connected Mongodb: ${url}`);
    console.log(`Database: ${dbName}`);
});

app.use(cors());
app.use(express.json());

app.listen(3001, function() {
    console.log('listening on 3001')
});

app.post('/register', async (req, res) => {
    try {
        console.log('getting request!: ' + req.body);
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Missing email and/or password");
        }
        const existing = await db.collection('Users').findOne({ email });

        if (existing) {
            return res.status(409).send("An account with this email already exists");
        }

        const encrytedPassword = await bcrypt.hash(password, 10);
        const user = {
            email: email,
            password: encryptedPassword,
            notes: []
        }
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
            res.status(400).send("Missing email and/or password");
        }
        const user = await db.collection('Users').findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
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
        const user = db.collection('Users').findOne({ email });
        if (user) {
            db.collection('Users').update({_id:user._id}, {notes:notes});
            res.status(200).json(user.notes);
        }
    } catch (err) {
        console.log(err);
    }
});
