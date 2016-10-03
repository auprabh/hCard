var express = require('express');
var router = express.Router();
var UserAPI = require("../api/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  UserAPI.getUser().then(function(user){
    user = JSON.parse(user);
    if(user.length == 0){
      UserAPI.setSeedData().then(function(user){
        UserAPI.getUser().then(function(user){
          user = JSON.parse(user);
          res.render('index', {hCardProps:user[0]});
        });
      });
    }else{
      res.render('index', {hCardProps:user[0]});
    }
  });
});

router.post('/update', function (req, res) {
  UserAPI.getUser().then(function(user){
    user = JSON.parse(user);
    var id = user[0].id;
    console.log('id: ', id);
    UserAPI.updateUser(id, req.body)
    .then(function(updatedUser){
      console.log('Updated successfully. UpdatedUser: ', updatedUser);
    })
  });
});

router.post('/submit', function (req, res) {
  UserAPI.saveUser(req.body).then(function(user){
    res.redirect('/');
  });
});

module.exports = router;
