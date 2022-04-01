const sequelize = require('./db') //For connectino
const Sequelize = require('sequelize') //For types
//Model describing the user table
const user = sequelize.define('user', {
    
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });


module.exports= user



