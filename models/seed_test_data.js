const tweet = require('./tweet');// For tweet creation
const user = require('./user'); //For user creation
const {hash} =require('../misc/hash')// For hashing passwords with bcrypt
const sequelize= require('./db'); // For sequelize creation
// TODO figure out  why the error happens
/*
  *  Seeds dummy data into database.
*/
module.exports.seedData=async ()=> {
    console.log("Seeding data")
    const users = [{
            name: "john",
            email: "john.doe@gmail.com",
            password:await  hash("password")
        },
        {
            name: "Andras",
            email: "iamnot@gonnausemyownemail.com",
            password: await hash("ThisIsMyRealPassword")
        },
        {
            name: "Test",
            email: "user@test.com",
            password: await hash("pass")

        }

    ]
    await createMockUsers(users);
    createMockTweets(users)
}

// sequelize.sync({force:true})
/*
* Creates users from list of users.
* Adds all users to the database from a list of users.
* @param      {Array}     users    List of users to be added
 */
async function createMockUsers(users) {

    return user.bulkCreate(users)
}
/*
* Creates tweets for a list of users. 
* Creates one tweet for each of the users provided, given that they exist in the database.
* @param      {Array}      users List of users to create tweets for.
*/
async function createMockTweets(users) {
    // await sequelize.sync({ force: true });
    let tweets = []
    for (element of users) {

        const current_user = await user.findOne({
            where: {
                email: element.email
            }
        })
      
        // tweets.push()
        try {
            // console.log(current_user)
            await tweet.create({
                content: "Hello World!",
                owner: current_user.id,

            })
        } catch (e) {
            console.log(e)
            continue
        }
    }

    
}