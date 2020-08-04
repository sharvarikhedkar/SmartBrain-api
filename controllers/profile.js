<<<<<<< HEAD
const handleProfile = (req,res,db) => {
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
}

module.exports = {
    handleProfile:handleProfile
=======
const handleProfile = (req,res,db) => {
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
}

module.exports = {
    handleProfile:handleProfile
>>>>>>> 1dc34f849c125c59b1b21ba3f2b0c82344bd9e03
}