var express = require('express');
var router = express.Router();
var models = require("../models");

// middleware
router.use(function(req, res, next) {
    console.log('hCard API middleware');
    next();
});

// Base API URL
router.get('/', function(req, res, next) {
  res.send({message:'hCard API'});
});

// Get last user
router.get('/user', function(req,res){
  models.User.findAll({
    order:[
      ['id', 'DESC']
    ],
    limit: 1
  }).then(function(users){
    res.json(users);
  });
});

// Get user with email
router.get('/user/:email', function(req, res) {
  models.User.find({
    where: {
      email: req.params.email
    }
  }).then(function(user) {
    res.json(user);
  });
});

// Update user by id
router.put('/user/:id', function(req, res){
  console.log('id:', req.params.id);

  var updateAttributes = {};
    if(req.body.givenName){
      updateAttributes.givenName = req.body.givenName;
    }
    if(req.body.surname){
      updateAttributes.surname = req.body.surname;
    }
    if(req.body.email){
      updateAttributes.email = req.body.email;
    }
    if(req.body.phone){
      updateAttributes.phone = req.body.phone;
    }
    if(req.body.houseNumber){
      updateAttributes.houseNumber = req.body.houseNumber;
    }
    if(req.body.street){
      updateAttributes.street = req.body.street;
    }
    if(req.body.suburb){
      updateAttributes.suburb = req.body.suburb;
    }
    if(req.body.state){
      updateAttributes.state = req.body.state;
    }
    if(req.body.postcode){
      updateAttributes.postcode = req.body.postcode;
    }
    if(req.body.country){
      updateAttributes.country = req.body.country;
    }
    console.log('updateAttributes: ', updateAttributes);

    models.User.find({
      where: {
        id: req.params.id
      }
    }).then(function(user) {
      if(user){
        user.updateAttributes(updateAttributes).then(function(user) {
          res.json(user);
        });
      }
    });

});

// Delete user
router.delete('/user/:email', function(req, res) {
  models.User.destroy({
    where: {
      email: req.params.email
    }
  }).then(function(user) {
    res.json(user);
  });
});

// Create new user
router.post('/user', function(req, res) {
  var user = {
    givenName:req.body.givenName,
    surname:req.body.surname,
    email:req.body.email,
    phone:req.body.phone,
    houseNumber:req.body.houseNumber,
    street:req.body.street,
    suburb:req.body.suburb,
    state:req.body.state,
    postcode:req.body.postcode,
    country:req.body.country
  }
  models.User.create(user).then(function(user) {
    res.json(user);
  });
});



module.exports = router;
