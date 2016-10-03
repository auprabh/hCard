"use strict";

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User", {
    givenName:DataTypes.STRING,
    surname:DataTypes.STRING,
    email:DataTypes.STRING,
    phone:DataTypes.STRING,
    houseNumber:DataTypes.STRING,
    street:DataTypes.STRING,
    suburb:DataTypes.STRING,
    state:DataTypes.STRING,
    postcode:DataTypes.STRING,
    country:DataTypes.STRING
  });

  return User;
};
