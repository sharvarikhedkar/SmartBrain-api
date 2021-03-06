<<<<<<< HEAD
const handleRegister = (req,res,db,bcrypt,saltRounds) => {
    const { email, password, name} = req.body;

    if(!email || !name || !password){
       return res.status(400).json('incorrect form submission');
    }

    const hash = bcrypt.hashSync(password,saltRounds);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name: name,
                joined: new Date()
            }) 
            .then(user => {
                res.json(user[0]);
        })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    handleRegister: handleRegister
}
=======


const handleRegister = (req,res,db,bcrypt,saltRounds) => {
    const { email, password, name} = req.body;
    
    if(!email || !name || !password){
       return res.status(400).json('incorrect form submission');
    }
    
    const hash = bcrypt.hashSync(password,saltRounds);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name: name,
                joined: new Date()
            }) 
            .then(user => {
                res.json(user[0]);
        })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    handleRegister: handleRegister
}
>>>>>>> 1dc34f849c125c59b1b21ba3f2b0c82344bd9e03
