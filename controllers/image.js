<<<<<<< HEAD
const  Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ec91620cabdf4e1180fb5e088fe46332',
   });


const handleApiCall = (req,res) =>{
    
    app.models
        .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req,res,db) =>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}
module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
=======
const  Clarifai = require('Clarifai');

const app = new Clarifai.App({
    apiKey: 'ec91620cabdf4e1180fb5e088fe46332'
   });

const handleApiCall = (req,res) =>{
    
    app.models
        .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'));
}


const handleImage = (req,res,db) =>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}
module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
>>>>>>> 1dc34f849c125c59b1b21ba3f2b0c82344bd9e03
