
const user= require( './user'); //For associations
const sequelize = require('./db') //For the connection
const Sequelize = require('sequelize') //For types


//  Model for table storing tweets
const tweet = sequelize.define('tweet', {
// Content of the tweet. 
    content:{
        type:Sequelize.STRING(280),
        allowNull:false
    },

  });
//  Make tweet belong to user.
tweet.belongsTo(user,  {
    foreignKey: {
        allowNull: false ,
        name:"owner",
        onDelete:'cascade', 
        onUpdate:'cascade'
    }
})

  module.exports=tweet

