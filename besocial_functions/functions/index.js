const functions = require('firebase-functions');
const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login } = require('./handlers/users');
const { FBAuth } = require('./util/FBAuth');


const express = require('express');
const app = express();

//Scream Routes
app.get('/screams', getAllScreams);

app.post('/scream', FBAuth, postOneScream);

//User Routes
app.post('/signup', signup);

app.post('/login', login)


exports.api = functions.https.onRequest(app);