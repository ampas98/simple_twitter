
const user= require( './user'); //For associations

const sequelize = require('./db') //For connection
const Sequelize = require('sequelize') //For types
// Model for the table storing the tokens
const token = sequelize.define('token', {

    token:{
        type:Sequelize.STRING(280),
        allowNull:false
    }
  });
//  Associating the token with a user.
token.belongsTo(user,  {
    foreignKey: { allowNull: false , name:"owner", onDelete:'cascade', 
    onUpdate:'cascade'}
})
// token.sync({force:true})
module.exports= token