const express = require('express');

const app = express();

app.get('/',(req,res)=> {
    res.send("this is working bro!");
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

/*
/ --> res = this is working
/signing --> POST = success/fail
/register --> POST
/profile/:userID --> GET = user
/image --> PUT = user
*/