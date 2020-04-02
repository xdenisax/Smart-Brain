const express = require('express');
const bodyParser= require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'calotadenisa17',
      database : 'facerecognition'
    }
});


app.post('/signin', (req,res) => signin.handleSignIn(req,res,database,bcrypt));

app.post('/register', (req, res) =>register.handleRegister(req,res,database,bcrypt));

app.get('/profile/:id', (req,res)=> profile.handleProfileGet(req,res,database));

app.put('/image',(req,res)=> image.imageGet(req,res,database));

app.post('/imageURL', (req,res) => image.handleAPICall(req,res));

var listener = app.listen(5000,()=>{
    console.log('app running on port ' + listener.address().port);
});
