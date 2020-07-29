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

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //currently localhost until we deploy it 
      user : 'postgres',
      password : 'Sharu@222',
      database : 'smartbrain'
    }
  });

 db.select('*').from('users').then(data => {
     console.log(data);
 });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

const database = {
    users:[
        {
        id:'123',
        name:'john',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
        },
        {
            id:'124',
            name:'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id :'987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

//Routes for application
app.get('/',(req,res)=> {
    res.send(database);
});

app.post('/signin',(req,res) => {

    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        //console.log(database.users[0])
        res.status(200).json(database.users[0]);
        //console.log("rEACHed");
    } else {
        res.status(400).json('error logging in');
    }
}
)

app.post('/register', (req,res) => {
    const { email, password, name} = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
    });

    db('users')
    .returning('*')
    .insert({
        email: email,
        name: name,
        joined: new Date()
    })
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'));

})

app.get('/profile/:id',(req,res) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id }).then(user => {

        if (user.length){
        res.json(user[0])
        }
        else{
            res.status(400).json('Not Found');
        }
    })
    .catch(err => res.status(400).json("not found"));
}))

app.put('/image',(req,res) =>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning(entries)
    .then(entries =>{
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'));
})

/*
/ --> res = this is working
/signing --> POST = success/fail
/register --> POST
/profile/:userID --> GET = user
/image --> PUT = user
*/