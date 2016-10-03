var Promise = require("bluebird");
var request = require('request');
var common = require('../common')
var config = common.config();
var contextRoot = "http://"+config.host+":"+config.port;

module.exports = {

  getUser: function(){
    return new Promise(function(resolve, reject) {
      request((contextRoot+'/api/user'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        }else{
          reject(error);
        }
      });
    });
  },

  setSeedData: function(){
    var seedData = {
      givenName: 'Sam',
      surname: 'Fairfax',
      email: 'sam.fairfax@fairfaxmedia.com.au',
      phone: '0292822833',
      houseNumber: '100',
      street: 'Harris Street',
      suburb: 'Pyrmont',
      state: 'NSW',
      postcode: '2009',
      country: 'Australia'
    };
    return new Promise(function(resolve, reject) {
      request.post({
        headers: {'content-type':'application/json'},
        url: contextRoot+'/api/user',
        body: JSON.stringify(seedData)
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        }else{
          reject(error);
        }
      });
    });
  },

  saveUser: function(body){
    return new Promise(function(resolve, reject) {
      request.post({
        headers: {'content-type':'application/json'},
        url: contextRoot+'/api/user',
        body: JSON.stringify(body)
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        }else{
          reject(error);
        }
      });
    });
  },

  updateUser: function(id, body){
    return new Promise(function(resolve, reject) {
      request.put({
        headers: {'content-type':'application/json'},
        url: contextRoot+'/api/user/'+id,
        body: JSON.stringify(body)
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        }else{
          reject(error);
        }
      });
    });
  }

};
