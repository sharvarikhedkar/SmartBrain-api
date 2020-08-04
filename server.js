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
      host : '127.0.0.1', //currently localhost until we deploy it 
      user : 'postgres',
      password : 'mandar@123',
      database : 'smartbrain'
    }
  });

 db.select('*').from('users').then(data => {
     //console.log(data);
 });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// const database = {
//     users:[
//         {
//         id:'123',
//         name:'john',
//         email: 'john@gmail.com',
//         password: 'cookies',
//         entries: 0,
//         joined: new Date()
//         },
//         {
//             id:'124',
//             name:'sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [
//         {
//             id :'987',
//             hash: '',
//             email: 'john@gmail.com'
//         }
//     ]
// }

//Routes for application
app.get('/',(req,res)=> { res.send(database) });
app.post('/signin',(req,res) => { signin.handleSignin(req,res,db,bcrypt,saltRounds)});
app.post('/register',(req,res) => { register.handleRegister(req,res,db,bcrypt,saltRounds)});
app.get('/profile/:id',(req,res) => { profile.handleProfile(req,res,db)})
app.put('/image',(req,res) =>{ image.handleImage(req,res,db)})
app.listen(3000, () => { console.log('app is running on port 3000') });

/*
/ --> res = this is working
/signing --> POST = success/fail
/register --> POST
/profile/:userID --> GET = user
/image --> PUT = user
*/
