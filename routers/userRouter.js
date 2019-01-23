const express = require('express');
const request = require('request');
const router = express.Router({ mergeParams: true });
const User = require('../models/userModel');

router.get('/', (req, res) => {

    User.find({}, (err, users) => {
        if(err) 
            return res.status(500).send({code: err.code});
        
        let userList = [];
        users.forEach(c => {
            userList.push(c);
        });
        res.send({ code:'00', message:"User list retrieved",data: userList});
    });
});

router.post('/', (req, res) => {

    let input = req.body;
    if(!input.first_name || !input.last_name || !input.email || !input.password)
        return res.status(400).json({code:'01', message: 'missing required fields' });

    let user = new User();

    user.first_name = input.first_name;
    user.last_name = input.last_name;
    user.email = input.email;
    user.setPassword(input.password);
  
    user.save((err) => {
        if(err)
            return res.status(500).json({code: err.code});

        res.send({code: '00', message: 'user registered', data: user});
    });
    
});

router.put('/', (req, res) => {

    let input = req.body;
    if(!input.first_name || !input.last_name || !input.email || !input.password)
        return res.status(400).json({code:'01', message: 'missing required fields'});
    
    User.findById(req.body._id, (err, user) => {
        if (err)
            return res.status(500).send({message: err.message});
        
        if(!user)
            return res.send({ code:'02',message: 'user not found'});
        
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        user.save(err => {
            if(err) 
                return res.status(500).send({code: err.code});
    
            res.send({code: '00', message:"user modified", data: user});
        });
    });
    
});

router.delete('/:id', (req, res) => {
    
    let input = req.params;
    if(!input.id)
    return res.status(400).json({code:'01', message: 'missing required fields'});

    User.findById(req.params.id, (err, user) => {
        if(err)
            return res.status(500).send({code: err.code});
        
        if(!user)
            return res.status(200).send({code:'02', message: 'user not found'});
        
        user.remove(err => {
            if(err)
                return res.status(500).send({code: err.code});
            
            res.send({code:'00', message:"user deleted", data: user});
        });
    });
    
});


module.exports = router;