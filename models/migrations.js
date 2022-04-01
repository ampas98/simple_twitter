
//Import all models so sequelize defines them
const user= require( './user');
const tweet =require('./tweet');
const token=require('./tokens')

const sequelize= require('./db')

//Sync sequelize so all changes get added to database thus creating tables
module.exports.migrate=()=>{
    console.log("Migrating models");
    return sequelize.sync({ force: true }).catch(err => console.log(err))
}


// migrate()