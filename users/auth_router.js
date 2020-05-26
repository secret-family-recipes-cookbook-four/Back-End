const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const secrets = require('../secret');

const Users = require('./user-model');

//register
router.post('/register', (req, res) => {
    let user = req.body;
       const rounds = process.env.HASH_ROUNDS || 12;
       const hash = bcryptjs.hashSync(user.password, rounds);
       user.password = hash;
  
       Users.add(user).then(saved => {
           res.status(201).json(saved);
  
       }).catch(err =>{
           res.status(500).json({message: 'an error has occurred'})
       })
  });
  

  //login
  router.post('/login', (req, res) => {
    let {username, password} = req.body;
       Users.find({username}).then(([user]) => {
           if(user && bcryptjs.compareSync(password, user.password)){
               const token = genToken(user);
               res.status(200).json({message: 'log in successful', token})
           } else {
               res.status(401).json({message: 'access denied'})
           }
       }).catch(err =>{
           res.status(500).json({message: 'an error has occurred'})
       })
  });
  
  
  function genToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '5d'
    }
  
    return jwt.sign(payload, secret, options)
  }
  
  
  module.exports = router;