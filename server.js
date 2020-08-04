const express = require('express');
const bodyParser = require('body-parser');

// npm package "bcrypt" for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

// npm package to Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional 
//HTTP headers to tell browsers to give a web application running at one origin, access to 
// selected resources from a different origin.
const cors = require('cors');

// using npm package "knex.js" to connect our postgres db to server
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');


const db = knex({
    client: 'pg',
    connection: {
      host : 'process.env.DATABASE_URL', //currently localhost until we deploy it 
      ssl: true,
    }
  });

 db.select('*').from('users').then(data => {
     //console.log(data);
 });

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routes for application
app.get('/',(req,res)=> { res.send('it is working') });
app.post('/signin',(req,res) => { signin.handleSignin(req,res,db,bcrypt,saltRounds)});
app.post('/register',(req,res) => { register.handleRegister(req,res,db,bcrypt,saltRounds)});
app.get('/profile/:id',(req,res) => { profile.handleProfile(req,res,db)})
app.put('/image',(req,res) =>{ image.handleImage(req,res,db)})
app.post('/imageurl',(req,res) =>{ image.handleApiCall(req,res)})
app.listen(process.env.PORT || 3000, () => { console.log(`app is running on port ${process.env.PORT}}`) });

/*
/ --> res = this is working
/signing --> POST = success/fail
/register --> POST
/profile/:userID --> GET = user
/image --> PUT = user
*/